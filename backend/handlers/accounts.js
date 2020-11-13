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
            database.insert({ username: username, password: password }, tables.USER_TABLE, function (res) {
                console.log("[SIGNUP] Successfully signed up user");
                socket.emit("signup_success");
            });
        } else {
            console.log("SIGNUP] User already exists");
            socket.emit("signup_failed");
        }
    });
}

const addFriend = (socket, username, friendUsername) => {
    console.log(username, "is attempting to add", friendUsername);
    database.query({ username: friendUsername }, tables.USER_TABLE, async function (res) {
        if (res.length == 0) {
            socket.emit("add_friend_failed");
        } else {
            let dbObj = await database.queryOneAsync({ username: username }, tables.FRIENDS_TABLE);
            if (dbObj == null) {
                await database.insertOneAsyncNoDuplicate({ username: username, friends_list: [friendUsername] }, { username: username }, tables.FRIENDS_TABLE);
                socket.emit("add_friend_success");
            } else {
                if (dbObj.friends_list.includes(friendUsername)) {
                    socket.emit("add_friend_failed");
                } else {
                    dbObj.friends_list.push(friendUsername)
                    database.update({username: username}, { friends_list: dbObj.friends_list }, tables.FRIENDS_TABLE, function(err, res) {
                        if (err) socket.emit("add_friend_failed");
                        socket.emit("add_friend_success");
                    });
                }
            }
        }
    });
}

module.exports = { login, signup, addFriend }