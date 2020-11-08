//import * as express from "express";
//import * as socketio from "socket.io";
//import * as path from "path";

/*

console.log("the SERVER file");

const app = express();
app.set("port", process.env.PORT || 3000);

let server = require("http").createServer(app);

let io = require("socket.io").listen(server);

const port = 3000;

app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("./xaiv-react-client/App.tsx"));
}); 

io.on("connection", function(socket: any) {
    console.log("I mean for FUCKS SAKE");
    io.emit("test event");
});

server.listen(port, () => console.log("server running on port:" + port)); */

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const { get } = require('http');

const PORT = process.env.PORT || 3000;
//const INDEX = '/public/views/index.html';

console.log(PORT);

var app = express();
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname));
}); 
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);

let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

io.on("connection", () => {
    console.log("HEY BGITCH");
    io.emit("test event");
});