// TABLES
// -------------------------------------------------
// |  username  |   password   |  profile_picture  |
// -------------------------------------------------
USER_TABLE = "users"

// ----------------------------------
// |  group_name  |   other_stuff   |
// ----------------------------------
GROUP_TABLE = "groups"

// ---------------------------------
// |  username  |   friends_list   |
// --------------------------------
FRIENDS_TABLE = "friends"

// -------------------------------
// |  group_name  |   username   |
// -------------------------------
GROUP_TO_USER_TABLE = "group_to_user"

// -------------------------------------------------------------------------------------
// |  activity_id  |   activity_name  |   activity_url  |   pub_key   |   secret_key   |
// -------------------------------------------------------------------------------------
ACTIVITY_TABLE = "activities"

module.exports = { USER_TABLE, GROUP_TABLE, FRIENDS_TABLE, GROUP_TO_USER_TABLE, ACTIVITY_TABLE }