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
});

//UserTable with users
//Group with group name and meta data

