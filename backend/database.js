var MongoClient = require('mongodb').MongoClient;

DATABASE_URL = "mongodb://localhost:27017/mydb";
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
        
        console.log("in MONGO MOTHERFUCKING DB, RESULT IS ", result);
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

module.exports = { insert, query, queryOneAsync }