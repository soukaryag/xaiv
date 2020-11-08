const database = require('./database');

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const { get } = require('http');
const PORT = process.env.PORT || 3000;

var app = express();
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname));
}); 
app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

io.on("connection", socket => {
    socket.on("swipe-left", (id) => {
        console.log("User ignored the fuck out of ", id);
    });

    socket.on("swipe-right", (id) => {
        console.log("User LIKED the fuck out of ", id);
    });

    socket.on("login", (username, password) => {
        console.log("Username:", username);
        console.log("Password:", password);
        database.query({username: username, password: password}).then(tmp => console.log("tmp is", tmp));
    });

    socket.on("signup", (username, password, first_name, last_name) => {
        console.log("Username:", username);
        console.log("Password:", password);
        let tmp = database.insert({username: username, password: password, first_name: first_name, last_name: last_name});
        console.log("tmp is", tmp);
    });
});
