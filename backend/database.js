DATABASE_URL = "mongodb://localhost:27017/mydb";
DATABASE_NAME = "xaiv"
USER_TABLE = "users"

async function insert(args) {
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DATABASE_NAME);
        dbo.collection(USER_TABLE).insertOne(args, function(err, res) {
        if (err) throw err;
            console.log("1 user inserted");
            db.close();
        });
    });
}

async function query(args) {
    var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DATABASE_NAME);
        dbo.collection(USER_TABLE).find(args).toArray(function(err, result) {
            if (err) console.log(err)
            console.log("result is", result);
            if (result == []) return false;
            db.close();
            return true;
        });
    });
}

module.exports = { insert, query }