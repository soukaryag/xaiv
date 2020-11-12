const database = require('./database/database');
const tables = require('./database/tables.config');
const conn = require('./solana/nodeConnection');
const solanaMain = require('./solana/solanaMain');
const swipe = require('./handlers/swipe');
const accounts = require('./handlers/accounts');

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;

connection = conn.getNodeConnection();

async function loadProgramToSolana() {
    await solanaMain.loadProgram('swipeLeftProgramId');
    await solanaMain.loadProgram('swipeRightProgramId');
}

loadProgramToSolana();

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
        swipe.swipe_left(cardData);
    });

    // swipe right - accept entity
    socket.on("swipe-right", (cardData) => {
        swipe.swipe_right(cardData);
    });

    // login - check username and password against the users database
    socket.on("login", (username, password) => {
        accounts.login(socket, username, password);
    });

    // signup - enter credentials to the current database if user does not exist
    socket.on("signup", (username, password) => {
        accounts.signup(socket, username, password);
    });

    //Return all of a user's ACTIVE groups
    socket.on("get_active_groups_for_user", async (username) => {
        database.query({username: username}, tables.GROUP_TO_USER_TABLE, async function(res) {
            //Assume only one user (unique usernames)
            var group_names = [];
            for (var i = 0; i < res.length; i++) {
                var group = await database.queryOneAsync({group_name: res[i]["group_name"]}, tables.GROUP_TABLE);
                var active = group["group_data"]["session"]["active"];
                if (active) {
                    group_names.push(res[i]["group_name"]);
                }
            }
            socket.emit("return_active_groups_for_user",  group_names);
        });
    });

    //Return all of a user's INACTIVE groups
    socket.on("get_inactive_groups_for_user", async (username) => {
        database.query({username: username}, tables.GROUP_TO_USER_TABLE, async function(res) {
            //Assume only one user (unique usernames)
            var group_names = [];
            for (var i = 0; i < res.length; i++) {
                var group = await database.queryOneAsync({group_name: res[i]["group_name"]}, tables.GROUP_TABLE);
                var active = group["group_data"]["session"]["active"];
                if (!active) {
                    group_names.push(res[i]["group_name"]);
                }
            }
            socket.emit("return_inactive_groups_for_user",  group_names);
        });
    });

    /*Upon selecting the group session they wish to partake in, generate a 
    feed of cards from the user's pool and send it back to them*/
    socket.on("get_feed_for_user", async (username, group) => {
        var ok = false;
        //First assert the user is actually in the group
        database.query({username: username}, tables.GROUP_TO_USER_TABLE, async function(names) {
            for (var i = 0; i < names.length; i++) {
                if (names[i]["group_name"] == group) {
                    ok = true;
                    break;
                }
            }
            if (ok) {
                database.query({group_name: group}, tables.GROUP_TABLE, async function(dbGroups) {
                    var members = dbGroups[0]["member_data"];
                    var userPool = null;
                    for (var i = 0; i < members.length; i++) {
                        if (members[i]["name"] == username) {
                            userPool = members[i]["pool"];
                        }
                    }
                    if (userPool == null) {
                        console.log("uh oh, user not found in group members");
                    }
                    else {
                        //Convert the pool (list of ids) to activity cards
                        //Arrange them as desired:
                        var feed = await convertPoolToActivities(userPool);
                        var cardFeed = [];
                        //Now from Activity DB objects to appropriate JSON cards
                        for (var i = 0; i < feed.length; i++) {
                            var tmp = {
                                "activity_name": feed[i]["activity_name"],
                                "activity_photo": feed[i]["activity_photo"],
                                "activity_id": feed[i]["activity_id"],
                            };
                            cardFeed.push(tmp);
                        }
                        console.log("FEED IS", cardFeed);
                        socket.emit("return_feed_for_user", cardFeed);
                    }
                    
                });
            }
            else {
                console.log("user not in group - fix");
                return;
            }
        });
    });
});

async function convertPoolToActivities(userPool) {
    var feed = [];
    for (var i = 0; i < userPool.length; i++) {
        var res = await database.queryOneAsync({activity_id: userPool[i]["id"]}, tables.ACTIVITY_TABLE);
        feed.push(res);
    }
    return feed;
}

