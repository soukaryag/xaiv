const tables = require('../database/tables.config');
const database = require('../database/database');

const getUser = (socket, username) => {
    database.query({ username: username }, tables.USER_TABLE, function (res) {
        if (res.length != 0) {
            socket.emit("receive_user", res[0]);
        }
    }); 
};

const login = (socket, username, password) => {
    database.query({ username: username, password: password }, tables.USER_TABLE, function (res) {
        if (res.length == 0) {
            socket.emit("login_failed");
        } else {
            socket.emit("login_success", res[0].username);
        }
    }); 
};

const signup = (socket, username, password) => {
    database.query({ username: username }, tables.USER_TABLE, function (res) {
        if (res.length == 0) {
            database.insert({ username: username, password: password, profile_picture: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" }, tables.USER_TABLE, function (res) {
                socket.emit("signup_success");
            });
        } else {
            socket.emit("signup_failed");
        }
    });
}

module.exports = { getUser, login, signup }