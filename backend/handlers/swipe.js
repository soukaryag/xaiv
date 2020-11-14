const tables = require('../database/tables.config');
const database = require('../database/database');
const solanaMain = require('../solana/solanaMain');

const swipe_left = (cardData) => {
    database.query({ activity_id: cardData.activity_id }, tables.ACTIVITY_TABLE, async function (res) {
        if (res.length != 0) {
            try {
                if ( 'pub_key_left' in res[0] ) {
                    activity = res[0];
                    await solanaMain.incrementCount(activity, "swipeLeftProgramId");
                } else {
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
        if (res.length != 0) {
            try {
                if ( 'pub_key_right' in res[0] ) {
                    activity = res[0];
                    await solanaMain.incrementCount(activity, "swipeRightProgramId");
                } else {
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