const database = require('./database');
const tables = require('./tables.config');
const conn = require('./solana/nodeConnection');
const swipe_left_load = require('./solana/swipe_left');
const storeModule = require('./solana/store');

const solanaWeb3 = require('@solana/web3.js');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;

connection = conn.getNodeConnection();

async function loadProgramToSolana(conn) {
    await swipe_left_load.loadProgram(conn);
}

loadProgramToSolana(connection);

var app = express();
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname));
});
app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

io.on("connection", socket => {
    // swipe left - reject entity
    socket.on("swipe-left", (cardData) => {
        database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, function (res) {
            console.log("Found", res.length, "results from the query");
            if (res.length == 0) {
                swipe_left_load.createAccount(cardData);
            } else {
                activity = res[0];
                swipe_left_load.incrementCount(activity);
                console.log("swiped left successfully!");

            }
        });
    });

    // swipe left - accept entity
    socket.on("swipe-right", (cardData) => {
        database.query({ activity_id: cardData.key }, tables.ACTIVITY_TABLE, function (res) {
            // if (res.length == 0) {
            //     database.insert(cardData, tables.ACTIVITY_TABLE, function (res) {
            //         console.log("Successfully added activity to the database");
            //     });
            // } else {
            //     activity = res[0];
            //     console.log(acitvity, "swipe-right")
            // }
            console.log("skipping for now...");
        });

        //database.insert({group_name: "Xaiv Devs in order of importance", members: ""}, tables.GROUP_TABLE, function(res) {
           // console.log("Successfully signed up user");
          //  socket.emit("signup_success");
        //});
    });

    // login - check username and password against the users database
    socket.on("login", (username, password) => {
        database.query({ username: username, password: password }, tables.USER_TABLE, function (res) {
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
        database.query({ username: username }, tables.USER_TABLE, function (res) {
            if (res.length == 0) {
                database.insert({ username: username, password: password }, tables.USER_TABLE, function (res) {
                    console.log("Successfully signed up user");
                    socket.emit("signup_success");
                });
            } else {
                console.log("User already exists");
                socket.emit("signup_failed");
            }
        });
    });

    //Return all of a user's groups
    socket.on("get_groups_for_user", (username) => {
        console.log("USERNAME IS ", username);
        database.query({username: username}, tables.GROUP_TO_USER_TABLE, function(res) {
            //Assume only one user (unique usernames)
            group_names = [];
            for (var i = 0; i < res.length; i++) {
                group_names.push(res[i]["group_name"]);
                console.log(res[i]["group_name"]);
                console.log("names is in loop ", group_names)
            }
            console.log(group_names);
            socket.emit("return_groups_for_user", group_names);
        });
    });
});
