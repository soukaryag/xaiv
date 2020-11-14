const tables = require('../database/tables.config');
const database = require('../database/database');

const login = (socket, username, password) => {
    database.query({ username: username, password: password }, tables.USER_TABLE, function (res) {
        if (res.length == 0) {
            console.log("[LOGIN] User not found");
            socket.emit("login_failed");
        } else {
            console.log("[LOGIN]", res[0].username, "found");
            socket.emit("login_success", res[0].username);
        }
    }); 
};

const signup = (socket, username, password) => {
    database.query({ username: username }, tables.USER_TABLE, function (res) {
        if (res.length == 0) {
            database.insert({ username: username, password: password, profile_picture: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" }, tables.USER_TABLE, function (res) {
                console.log("[SIGNUP] Successfully signed up user");
                socket.emit("signup_success");
            });
        } else {
            console.log("SIGNUP] User already exists");
            socket.emit("signup_failed");
        }
    });
}

module.exports = { login, signup }