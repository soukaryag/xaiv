var MongoClient = require('mongodb').MongoClient;

DATABASE_URL = "mongodb://localhost:27017/mydb";
DATABASE_NAME = "xaiv"

// tables
USER_TABLE = "users"
GROUP_TABLE = "groups"
USER_TO_GROUP_TABLE = "user_to_group"
GROUP_TO_USER_TABLE = "group_to_user"

function insert(args, callBack) {
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DATABASE_NAME);
        dbo.collection(USER_TABLE).insertOne(args, function(err, res) {
            if (err) throw err;
            db.close();
            return callBack(res);
        });
    });
}

function query(args, callBack) {
    MongoClient.connect(DATABASE_URL, function(err, db){
        if(err) throw err;
        var dbo = db.db(DATABASE_NAME);
        dbo.collection(USER_TABLE).find(args).toArray(function(err, result){
            if(err) throw err;
            db.close();
            return callBack(result);
        });
    })
}

module.exports = { insert, query }