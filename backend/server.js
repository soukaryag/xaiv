const database = require('./database');

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
    socket.on("swipe-left", (id) => {
        console.log("User ignored the fuck out of ", id);
    });

    // swipe left - accept entity
    socket.on("swipe-right", (id) => {
        console.log("User LIKED the fuck out of ", id);
    });

    // login - check username and password against the users database
    socket.on("login", (username, password) => {
        database.query({username: username, password: password}, function(res) {
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
        database.query({username: username}, function(res) {
            if (res.length == 0) {
                database.insert({username: username, password: password}, function(res) {
                    console.log("Successfully singed up user");
                    socket.emit("signup_success");
                });
            } else {
                console.log("User already exists");
                socket.emit("signup_failed");
            }
        });
    });
});