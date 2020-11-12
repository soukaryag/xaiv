const solanaWeb3 = require('@solana/web3.js');
const storeModule = require('./store');
const tables = require('../tables.config');
const database = require('../database');
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

async function newAccountWithLamports(connection, lamports = 1000000) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    const account = new solanaWeb3.Account();

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
        console.log(`Airdrop retry ${retries}`);
    }
    throw new Error(`Airdrop of ${lamports} failed`);
}

/**
 * Establish an account to pay for everything
 */
async function establishPayer(programName) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }
    
    if (!payerAccount) {
        let fees = 0;
        const { feeCalculator } = await connection.getRecentBlockhash();

        // Calculate the cost to load the program
        let data = "";
        if ( programName === 'swipeLeftProgramId') 
            data = await fs.readFile(pathToSwipeLeftProgram);
        else 
            data = await fs.readFile(pathToSwipeRightProgram);
        const NUM_RETRIES = 500; // allow some number of retries
        fees +=
            feeCalculator.lamportsPerSignature *
            (solanaWeb3.BpfLoader.getMinNumSignatures(data.length) + NUM_RETRIES) +
            (await connection.getMinimumBalanceForRentExemption(data.length));

        // Calculate the cost to fund the greeter account
        fees += await connection.getMinimumBalanceForRentExemption(
            swipeDataLayout.span,
        );

        // Calculate the cost of sending the transactions
        fees += feeCalculator.lamportsPerSignature * 1000; // wag

        // Fund a new payer via airdrop
        payerAccount = await newAccountWithLamports(connection, fees);
    }

    const lamports = await connection.getBalance(payerAccount.publicKey);
    console.log(
        'Using account',
        payerAccount.publicKey.toBase58(),
        'containing',
        lamports / solanaWeb3.LAMPORTS_PER_SOL,
        'Sol to pay for fees',
    );
}

async function loadProgram(programName) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    // Check if the program has already been loaded
    try {
        // load swipe left
        const store = new storeModule.Store();
        const config = await store.load('config.json');
        programId = new solanaWeb3.PublicKey(config[key]);
        await connection.getAccountInfo(programId);
        console.log('Program already loaded to account', programId.toBase58());
        return;
    } catch (err) {
        // try to load the program
    }

    await establishPayer(programName);

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

    if (!payerAccount) {
        await establishPayer(programName);
    }

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
    cardData.pub_key_left = activity_account.publicKey.toBase58();
    var tmpArr = []; 
    for(var p in Object.getOwnPropertyNames(activity_account.secretKey)) {
        tmpArr[p] = activity_account.secretKey[p]
    }
    cardData.secret_key_left = JSON.stringify(tmpArr);
    database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, function (res) {
        if (res.length == 0) {
            database.insert(cardData, tables.ACTIVITY_TABLE, function (res) {
                console.log("[RIGHT] Successfully added activity to the database");
            });
        } else {
            database.update({ activity_id: cardData.activity_id }, { pub_key_right: cardData.pub_key_left, secret_key_right: cardData.secret_key_left }, tables.ACTIVITY_TABLE, function (res) {
                console.log("[LEFT] Successfully added activity to the database")
            })
        }
    });
    
}

async function incrementCount(activity, programName) {
    if (!connection) {
        connection = await conn.getNodeConnection();
    }

    console.log(1);

    const store = new storeModule.Store();
    const config = await store.load('config.json');
    const programId = new solanaWeb3.PublicKey(config[programName]);

    console.log(1, config[programName]);

    let activity_account_pubKey = null;
    if ( programName === "swipeRightProgramId" )
        activity_account_pubKey = new solanaWeb3.PublicKey(activity.pub_key_right);
    else
        activity_account_pubKey = new solanaWeb3.PublicKey(activity.pub_key_left);

    const instruction = new solanaWeb3.TransactionInstruction({
        keys: [{ pubkey: activity_account_pubKey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.alloc(0),
    })

    console.log(2, instruction);

    if (!payerAccount) {
        await establishPayer(programName);
    }

    console.log(3);

    await solanaWeb3.sendAndConfirmTransaction(
        connection,
        new solanaWeb3.Transaction().add(instruction),
        [payerAccount],
        {
            commitment: 'singleGossip',
            preflightCommitment: 'singleGossip',
        },
    )

    console.log("TRANSACTION FINISHED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
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

module.exports = { loadProgram, swipeDataLayout, createAccount, incrementCount };