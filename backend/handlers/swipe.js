const tables = require('../database/tables.config');
const database = require('../database/database');
const solanaMain = require('../solana/solanaMain');

const swipe_left = (cardData) => {
    database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, async function (res) {
        console.log("[LEFT] Found", res.length, "results from the query");
        if (res.length != 0) {
            try {
                if ( 'pub_key_left' in res[0] ) {
                    console.log("[LEFT] This acitivity is already hosted on the chain");
                    activity = res[0];
                    await solanaMain.incrementCount(activity, "swipeLeftProgramId");
                    console.log("[LEFT] swiped left successfully!");
                } else {
                    console.log("[LEFT] This acitivity will be loaded to the chain");
                    await solanaMain.createAccount(cardData, "swipeRightProgramId");
                    await solanaMain.createAccount(cardData, "swipeLeftProgramId");
                }
            } catch (err) {
                console.error(err);
                console.log("[LEFT] failed to reach solana :(");
            }
        }
    });
}

const swipe_right = (cardData) => {
    database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, async function (res) {
        console.log("[RIGHT] Found", res.length, "results from the query");
        if (res.length != 0) {
            try {
                if ( 'pub_key_right' in res[0] ) {
                    console.log("[RIGHT] This acitivity is already hosted on the chain");
                    activity = res[0];
                    await solanaMain.incrementCount(activity, "swipeRightProgramId");
                    console.log("[RIGHT] swiped right successfully!");
                } else {
                    console.log("[RIGHT] This acitivity will be loaded to the chain");
                    await solanaMain.createAccount(cardData, "swipeRightProgramId");
                    await solanaMain.createAccount(cardData, "swipeLeftProgramId");
                }
            } catch (err) {
                console.error(err);
                console.log("[RIGHT] failed to reach solana :(");
            }
        }
    });
}

module.exports = { swipe_left, swipe_right };