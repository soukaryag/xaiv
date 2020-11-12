const tables = require('../database/tables.config');
const database = require('../database/database');
const solanaMain = require('../solana/solanaMain');

const swipe_left = (cardData) => {
    database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, async function (res) {
        console.log("[LEFT] Found", res.length, "results from the query");
        if (res.length == 0) {
            await solanaMain.createAccount(cardData, "swipeRightProgramId");
            await solanaMain.createAccount(cardData, "swipeLeftProgramId");
        } else {
            try {
                activity = res[0];
                await solanaMain.incrementCount(activity, "swipeLeftProgramId");
                console.log("[LEFT] swiped left successfully!");
            } catch (err) {
                console.log("[LEFT] failed to reach solana :(");
                console.error(err);
            }
        }
    });
}

const swipe_right = (cardData) => {
    database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, async function (res) {
        console.log("[RIGHT] Found", res.length, "results from the query");
        if (res.length == 0) {
            await solanaMain.createAccount(cardData, "swipeRightProgramId");
            await solanaMain.createAccount(cardData, "swipeLeftProgramId");
        } else {
            try {
                activity = res[0];
                await solanaMain.incrementCount(activity, "swipeRightProgramId");
                console.log("[RIGHT] swiped right successfully!");
            } catch (err) {
                console.log("[RIGHT] failed to reach solana :(");
                console.err(err);
            }
        }
    });
}

module.exports = { swipe_left, swipe_right };