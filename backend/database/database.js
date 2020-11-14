require('dotenv').config()

var MongoClient = require('mongodb').MongoClient;

// DATABASE_URL = "mongodb://localhost:27017/mydb";
DATABASE_URL = "mongodb+srv://xaiv_admin:xaiv_password@cluster0.qrq9u.mongodb.net/xaivdatabse?retryWrites=true&w=majority";
DATABASE_NAME = "xaiv"

function insert(args, table, callBack) {
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DATABASE_NAME);
        dbo.collection(table).insertOne(args, function(err, res) {
            if (err) throw err;
            db.close();
            return callBack(res);
        });
    });
}

//Async insert. Doesn't insert if duplicate already exists...
async function insertOneAsyncNoDuplicate(args, matchArgs, table) {
    const client = await MongoClient.connect(DATABASE_URL);
    if (!client) {
        return;
    }
    try {
        const db = client.db(DATABASE_NAME);
        let collection = db.collection(table);
        let result = await queryOneAsync(matchArgs, table);
        if (result == null) {
            await collection.insertOne(args);
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.close();
    }
}

async function queryOneAsync(args, table) {
    const client = await MongoClient.connect(DATABASE_URL);
    if (!client) {
        return;
    }
    let result = null;
    try {
        const db = client.db(DATABASE_NAME);
        let collection = db.collection(table);
        result = await collection.findOne(args);
        return result;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.close();
        return result;
    }
}



function query(args, table, callBack) {
    MongoClient.connect(DATABASE_URL, function(err, db){
        if(err) throw err;
        var dbo = db.db(DATABASE_NAME);
        dbo.collection(table).find(args).toArray(function(err, result){
            if(err) throw err;
            db.close();
            return callBack(result);
        });
    })
}

function update(query, newValues, table, callBack) {
    MongoClient.connect(DATABASE_URL, function(err, db){
        if(err) throw err;
        var dbo = db.db(DATABASE_NAME);
        let args = { $set: newValues }
        dbo.collection(table).updateOne(query, args, function(err, result){
            if(err) throw err;
            db.close();
            return callBack(result);
        });
    })
}

module.exports = { insertOneAsyncNoDuplicate, insert, queryOneAsync, query, update }
