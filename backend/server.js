const database = require('./database');
const tables = require('./tables.config');

const solanaWeb3 = require('@solana/web3.js');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;

var app = express();
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname));
}); 
app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

io.on("connection", socket => {
    // swipe left - reject entity
    socket.on("swipe-left", (cardData) => {
        database.query({activity_id: cardData.key}, function(res) {
            if (res.length == 0) {
                // create solana account for activity
                
                database.insert(cardData, tables.ACTIVITY_TABLE, function(res) {
                    console.log("Successfully added activity to the database");
                });
            } else {
                activity = res[0];
                console.log(acitvity, "swipe-left")
            }
        });
    });

    // swipe left - accept entity
    socket.on("swipe-right", (cardData) => {
        database.query({activity_id: cardData.key}, function(res) {
            if (res.length == 0) {
                database.insert(cardData, tables.ACTIVITY_TABLE, function(res) {
                    console.log("Successfully added activity to the database");
                });
            } else {
                activity = res[0];
                console.log(acitvity, "swipe-right")
            }
        });
    });

    // login - check username and password against the users database
    socket.on("login", (username, password) => {
        database.query({username: username, password: password}, tables.USER_TABLE, function(res) {
            if (res.length == 0) {
                console.log("USER NOT FOUND");
                socket.emit("login_failed");
            } else {
                console.log(res[0].username, "FOUND");
                socket.emit("login_success", res[0].username);
            }
        });
    });

    // signup - enter credentials to the current database if user does not exist
    socket.on("signup", (username, password) => {
        database.query({username: username}, tables.USER_TABLE, function(res) {
            if (res.length == 0) {
                database.insert({username: username, password: password}, tables.USER_TABLE, function(res) {
                    console.log("Successfully signed up user");
                    socket.emit("signup_success");
                });
            } else {
                console.log("User already exists");
                socket.emit("signup_failed");
            }
        });
    });
});
