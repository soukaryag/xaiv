require('dotenv').config()

const database = require('./database/database');
const tables = require('./database/tables.config');
const conn = require('./solana/nodeConnection');
const solanaMain = require('./solana/solanaMain');
const swipe = require('./handlers/swipe');
const accounts = require('./handlers/accounts');
const friends = require('./handlers/friends');
const googleApi = require('./handlers/googleApi');

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
    socket.on("swipe-left", async (username, group_name, cardData) => {
        swipe.swipe_left(cardData);
    
        let group = await database.queryOneAsync({group_name: group_name}, tables.GROUP_TABLE);

        //tally that activity's swipes in the main pool
        var p = group["group_data"]["session"]["pool"];
        for (var i = 0; i < p.length; i++) {
            if (p[i]["id"] == cardData["activity_id"]) {
                //match found
                p[i]["swipe_lefts"] += 1;
            }
        }

        //add that activity to the user's swipes tracker
        for (var i = 0; i < group["member_data"].length; i++) {
            if (group["member_data"][i]["name"] == username) {
                group["member_data"][i]["swipe_lefts"].push({
                    id: cardData["activity_id"]
                });
                //delete that activity from the user's pool
                for (var j = 0; j < group["member_data"][i]["pool"].length; j++) {
                    if (group["member_data"][i]["pool"][j]["id"] == cardData["activity_id"]) {
                        //remove it
                        group["member_data"][i]["pool"].splice(j, 1);
                        break;
                    }
                }
            }

            
        }

        database.update({group_name: group_name}, group, tables.GROUP_TABLE, function() {
            //don't give a FUCK
        });
    });

    // swipe right - accept entity
    socket.on("swipe-right", async (username, group_name, cardData) => {
        swipe.swipe_right(cardData);

        let group = await database.queryOneAsync({group_name: group_name}, tables.GROUP_TABLE);
        
        var consensus = false;
        //tally that activity's swipes in the main pool
        var p = group["group_data"]["session"]["pool"];
        for (var i = 0; i < p.length; i++) {
            if (p[i]["id"] == cardData["activity_id"]) {
                //match found
                p[i]["swipe_rights"] += 1;
                if (p[i]["swipe_rights"] == group["group_data"]["members"].length) {
                    console.log("consensus achieved!!");
                    consensus = true;
                    var temp = {
                        id: p[i]["id"],
                    };
                    var act = await database.queryOneAsync({activity_id: p[i]["id"]}, tables.ACTIVITY_TABLE);
                    temp["photo"] = act["activity_photo"];
                    temp["name"] = act["activity_name"];
                    temp["topic"] = group["group_data"]["session"]["topic"];
                    group["group_data"]["session"]["consensus"].push(temp);
                }
            }
        }

        //add that activity to the user's swipes tracker
        for (var i = 0; i < group["member_data"].length; i++) {
            if (group["member_data"][i]["name"] == username) {
                group["member_data"][i]["swipe_rights"].push({
                    id: cardData["activity_id"]
                });
                //delete that activity from the user's pool
                for (var j = 0; j < group["member_data"][i]["pool"].length; j++) {
                    if (group["member_data"][i]["pool"][j]["id"] == cardData["activity_id"]) {
                        //remove it
                        group["member_data"][i]["pool"].splice(j, 1);
                        break;
                    }
                }
            }

            
        }

        database.update({group_name: group_name}, group, tables.GROUP_TABLE, function(e, r) {
            //don't give a FUCK
            if (consensus) {
                socket.emit("consensus_achieved", cardData);
            }
        });
    });

    // login - check username and password against the users database
    socket.on("login", (username, password) => {
        accounts.login(socket, username, password);
    });

    // signup - enter credentials to the current database if user does not exist
    socket.on("signup", (username, password) => {
        accounts.signup(socket, username, password);
    });

    socket.on("get_user", (username) => {
        accounts.getUser(socket, username);
    });

    // add friend - add friend to someone's friend list
    socket.on("add_friend", (username, friendUsername) => {
        friends.addFriend(socket, username, friendUsername);
    });

    socket.on("get_friends", (username) => {
        friends.getFriends(socket, username);
    });

    socket.on("get_top_activities_solana", async () => {
        database.query({pub_key_right: { $regex: ".*" }, pub_key_left: { $regex: ".*" }}, tables.ACTIVITY_TABLE, async function(res) {
            if ( res.length < 2 ) return {} 
            let tmp = [];
            while(tmp.length < 2){
                var r = Math.floor(Math.random() * (res.length - 1)) + 1;
                if(tmp.indexOf(r) === -1) tmp.push(r);
            }
            resultZero = await solanaMain.getAccountData(res[tmp[0]]);
            resultOne = await solanaMain.getAccountData(res[tmp[1]]);
            information = {
                activity_zero: {
                    activity_name: res[tmp[0]].activity_name.slice(0, 14), 
                    activity_photo: res[tmp[0]].activity_photo,
                    right: resultZero.right.swipe,
                    left: resultZero.left.swipe
                },
                activity_one: {
                    activity_name: res[tmp[1]].activity_name.slice(0, 14), 
                    activity_photo: res[tmp[1]].activity_photo,
                    right: resultOne.right.swipe,
                    left: resultOne.left.swipe
                }
            }
            socket.emit("receive_top_activities_solana", information);
        })
    });

    socket.on("create_group", (members, group_name) => {
        var newGroup = {};
        newGroup["group_name"] = group_name;
        newGroup["group_data"] = {
            members: members,
            session: {
                active: false,
                radius: 5,
                //insert date here
                topic: "",
                pool: [],
                consensus: [],
            }
        };
        newGroup["member_data"]
        newGroup["member_data"] = [];
        for (var i = 0; i < members.length; i++) {
            newGroup["member_data"].push({
                name : members[i],
                pool: [],
                swipe_lefts: [],
                swipe_rights: [],
            })

            //also take the chance to add them to the db
            database.insert({group_name: group_name, username: members[i]}, tables.GROUP_TO_USER_TABLE, function() {

            });
        }
        database.insert(newGroup, tables.GROUP_TABLE, function() {

        });
    });

    //Instantiate a new session for the given username, group name, and topic string
    socket.on("create_session", (username, group_name, topic, lng, lat, radius) => {
        let ok = false;
        //First assert the user is actually in the group
        database.query({username: username}, tables.GROUP_TO_USER_TABLE, async function(names) {
            for (let i = 0; i < names.length; i++) {
                if (names[i]["group_name"] == group_name) {
                    ok = true;
                    break;
                }
            }
            if (ok) {
                let group = await database.queryOneAsync({group_name: group_name}, tables.GROUP_TABLE);
                //initialize the group session here
                //pull card data from the google api
                group["group_data"]["session"]["active"] = true;
                group["group_data"]["session"]["topic"] = topic;
                radius = group["group_data"]["session"]["radius"]; //Consider removing this
                var places = await googleApi.fetchActivities(socket, lng, lat, radius, topic);
                for (var i = 0; i < places.length; i++) {
                    await database.insertOneAsyncNoDuplicate(places[i], {activity_id: places[i]["activity_id"]}, tables.ACTIVITY_TABLE);
                    
                    //sorry... xD
                    var xddd = {
                        id: places[i].activity_id,
                        swipe_lefts: 0,
                        swipe_rights: 0,
                    };
                    var xddd2 = {
                        id: places[i].activity_id,
                    };
                    
                    group["group_data"]["session"]["pool"].push(xddd);
                    for (var j = 0; j < group["member_data"].length; j++) {
                        group["member_data"][j]["pool"].push(xddd2);
                    }
                }
                database.update({group_name: group_name}, group, tables.GROUP_TABLE, function(e, r) {
                    //joe momma
                    socket.emit("create_session_complete");
                });
            }
        });
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

    socket.on("get_active_groups_and_consensus_for_user", async (username) => {
        database.query({username: username}, tables.GROUP_TO_USER_TABLE, async function(res) {
            //Assume only one user (unique usernames)
            var groups = [];
            for (var i = 0; i < res.length; i++) {
                var group = await database.queryOneAsync({group_name: res[i]["group_name"]}, tables.GROUP_TABLE);
                var active = group["group_data"]["session"]["active"];
                if (active) {
                    groups.push({
                        name: res[i]["group_name"],
                        consensus: group.group_data.session.consensus
                    });
                }
                
            }
            console.log(groups);
            socket.emit("return_active_groups_and_consensus_for_user",  groups);
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
    var argsList = [];
    for (var i = 0; i < userPool.length; i++) {
        argsList.push({
            activity_id: userPool[i]["id"]
        })
    }
    feed = await database.queryManyAsync(argsList, tables.ACTIVITY_TABLE);
    console.log("returning FEED POOP", feed);
    /*for (var i = 0; i < userPool.length; i++) {
        var res = await database.queryOneAsync({activity_id: userPool[i]["id"]}, tables.ACTIVITY_TABLE);
        feed.push(res);
    } */
    return feed;
}

