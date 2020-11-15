const solanaWeb3 = require('@solana/web3.js');
const storeModule = require('./store');
const tables = require('../database/tables.config');
const database = require('../database/database');
const fs = require('mz/fs');
const conn = require('./nodeConnection');
const BufferLayout = require('buffer-layout');

let connection;
let payerAccount;
let programId;

const pathToSwipeLeftProgram = './source_code/swipe_left.so';
const pathToSwipeRightProgram = './source_code/swipe_right.so';

const swipeDataLayout = BufferLayout.struct([
    BufferLayout.u32('swipe'),
]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function newAccountWithLamports(connection, programName, lamports = 1000000) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    const account = new solanaWeb3.Account();
    var tmpArr = []; 
    for(var p in Object.getOwnPropertyNames(account.secretKey)) {
        tmpArr[p] = account.secretKey[p]
    }
    const secret_key = JSON.stringify(tmpArr);

    database.insert({ username: programName, password: "password", pub_key: account.publicKey.toBase58(), secret_key: secret_key }, tables.USER_TABLE, function (res) {
        console.log("[ESTABLISH PAYER] Created new payer account.")
    });

    let retries = 10;
    await connection.requestAirdrop(account.publicKey, lamports);
    for (;;) {
        await sleep(500);
        if (lamports == (await connection.getBalance(account.publicKey))) {
            return account;
        }
        if (--retries <= 0) {
            break;
        }
        console.log(`[ESTABLISH PAYER] Airdrop retry ${retries}`);
    }
    throw new Error(`[ESTABLISH PAYER] Airdrop of ${lamports} failed`);
}

async function fundAccountWithLamports(connection, pubKey, lamports = 10000000000) {
    let retries = 10;
    let prevBalance = await connection.getBalance(pubKey);
    await connection.requestAirdrop(pubKey, lamports);
    for (;;) {
        await sleep(500);
        if (lamports+prevBalance == (await connection.getBalance(pubKey))) {
            return "Success";
        }
        if (--retries <= 0) {
            break;
        }
        console.log(`[ESTABLISH PAYER] Airdrop retry ${retries}`);
    }
    throw new Error(`[ESTABLISH PAYER] Airdrop of ${lamports} failed`);
}

async function loadProgram(programName) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    // Check if the program has already been loaded
    try {
        const store = new storeModule.Store();
        const config = await store.load('config.json');
        programId = new solanaWeb3.PublicKey(config[programName]);
        await connection.getAccountInfo(programId);
        console.log('Program already loaded to account', programId.toBase58());
        return;
    } catch (err) {
        // try to load the program
        let payerAccount = await newAccountWithLamports(
            connection,
            programName
        );

        // Load the program
        let data = "";
        if ( programName === 'swipeLeftProgramId') 
            data = await fs.readFile(pathToSwipeLeftProgram);
        else 
            data = await fs.readFile(pathToSwipeRightProgram);
        const programAccount = new solanaWeb3.Account();
        await solanaWeb3.BpfLoader.load(
            connection,
            payerAccount,
            programAccount,
            data,
            solanaWeb3.BPF_LOADER_PROGRAM_ID,
        );
        programId = programAccount.publicKey;
        console.log('Program loaded to account', programId.toBase58());

        // Save this info for next time
        const store = new storeModule.Store();
        const config = await store.load('config.json');
        config[programName] = programId.toBase58()
        await store.save('config.json', config);
    }
}

async function createAccount(cardData, programName) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    const activity_account = new solanaWeb3.Account();
    activity_account_pub_key = activity_account.publicKey;
    const space = swipeDataLayout.span;
    const lamports = await connection.getMinimumBalanceForRentExemption(
        swipeDataLayout.span,
    );

    const store = new storeModule.Store();
    const config = await store.load('config.json');
    const programId = new solanaWeb3.PublicKey(config[programName]);

    let payerAccount = await newAccountWithLamports(
        connection,
        programName
    );

    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.createAccount({
            fromPubkey: payerAccount.publicKey,
            newAccountPubkey: activity_account_pub_key,
            lamports,
            space,
            programId,
        }),
    );
    await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payerAccount, activity_account],
        {
            commitment: 'singleGossip',
            preflightCommitment: 'singleGossip',
        },
    );

    // append this activity to the database
    cardData.pub_key = activity_account.publicKey.toBase58();
    var tmpArr = []; 
    for(var p in Object.getOwnPropertyNames(activity_account.secretKey)) {
        tmpArr[p] = activity_account.secretKey[p]
    }
    cardData.secret_key = JSON.stringify(tmpArr);

    database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, function (res) {
        if (res.length == 0) {
            database.insert(cardData, tables.ACTIVITY_TABLE, function (res) {
                console.log("[RIGHT] Successfully added activity to the database");
            });
        } else {
            if ( programName === "swipeRightProgramId" ) {
                database.update({ activity_id: cardData.activity_id }, { pub_key_right: cardData.pub_key, secret_key_right: cardData.secret_key }, tables.ACTIVITY_TABLE, function (res) {
                    console.log("[RIGHT] Successfully added activity to the database")
                })
            } else {
                database.update({ activity_id: cardData.activity_id }, { pub_key_left: cardData.pub_key, secret_key_left: cardData.secret_key }, tables.ACTIVITY_TABLE, function (res) {
                    console.log("[LEFT] Successfully added activity to the database")
                })
            }
            
        }
    });
    
}

async function incrementCount(activity, programName) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    const store = new storeModule.Store();
    const config = await store.load('config.json');
    const programId = new solanaWeb3.PublicKey(config[programName]);

    let account_pubKey = "";
    if ( programName === "swipeRightProgramId" ) {
        account_pubKey = activity.pub_key_right;
    } else {
        account_pubKey = activity.pub_key_left;
    }
    const activity_account_pubKey = new solanaWeb3.PublicKey(account_pubKey);

    const instruction = new solanaWeb3.TransactionInstruction({
        keys: [{ pubkey: activity_account_pubKey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.alloc(0),
    })

    let payerAccount = await newAccountWithLamports(
        connection,
        programName
    );

    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        new solanaWeb3.Transaction().add(instruction),
        [payerAccount],
        { skipPreflight: false, commitment: 'recent', preflightCommitment: 'recent' }
    )

    console.log("[INCREMENT] Transaction concluded for", activity.activity_name);
    await printAccountData(activity.activity_name, activity.pub_key_right, activity.pub_key_left);
}

async function printAccountData(activity_name, pub_key_right, pub_key_left) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    PubKeyRight = new solanaWeb3.PublicKey(pub_key_right);
    const accountInfo_right = await connection.getAccountInfo(PubKeyRight);
    PubKeyLeft = new solanaWeb3.PublicKey(pub_key_left);
    const accountInfo_left = await connection.getAccountInfo(PubKeyLeft);
    if (accountInfo_right === null || accountInfo_left === null) {
        throw 'Error: cannot find the account';
    }
    const infoRight = swipeDataLayout.decode(Buffer.from(accountInfo_right.data));
    const infoLeft = swipeDataLayout.decode(Buffer.from(accountInfo_left.data));
    console.log(
        activity_name,
        'has the following metrics:\n',
        `RIGHT SWIPES: ${infoRight.swipe.toString()}\n`,
        `LEFT SWIPES: ${infoLeft.swipe.toString()}\n`
    );
}

async function getAccountData(accountInfo) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    PubKeyRight = new solanaWeb3.PublicKey(accountInfo.pub_key_right);
    const accountInfo_right = await connection.getAccountInfo(PubKeyRight);
    PubKeyLeft = new solanaWeb3.PublicKey(accountInfo.pub_key_left);
    const accountInfo_left = await connection.getAccountInfo(PubKeyLeft);
    if (accountInfo_right === null || accountInfo_left === null) {
        throw 'Error: cannot find the account';
    }
    const infoRight = swipeDataLayout.decode(Buffer.from(accountInfo_right.data));
    const infoLeft = swipeDataLayout.decode(Buffer.from(accountInfo_left.data));
    return { left: infoLeft, right: infoRight }
}

module.exports = { loadProgram, swipeDataLayout, createAccount, getAccountData, incrementCount };