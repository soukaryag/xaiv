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

module.exports = { insert, query, update }