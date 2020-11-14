const tables = require('../database/tables.config');
const database = require('../database/database');

const getFriends = (socket, username) => {
    database.query({ username: username }, tables.FRIENDS_TABLE, function (res) {
        if (res.length != 0) {
            socket.emit("receive_friends", res[0].friends_list);
        }
    });
}

const addFriend = (socket, username, friendUsername) => {
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

module.exports = { getFriends, addFriend }