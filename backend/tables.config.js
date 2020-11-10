// TABLES
// ----------------------------------------------------------
// |  username  |   password   |  first_name  |  last_name  |
// ----------------------------------------------------------
USER_TABLE = "users"

// ----------------------------------
// |  group_name  |   other_stuff   |
// ----------------------------------
GROUP_TABLE = "groups"

// -------------------------------
// |  username  |   group_name   |
// -------------------------------
USER_TO_GROUP_TABLE = "user_to_group"

// -------------------------------
// |  group_name  |   username   |
// -------------------------------
GROUP_TO_USER_TABLE = "group_to_user"

// --------------------------------------------------
// |  activity_name  |   pub_key   |   secret_key   |
// --------------------------------------------------
ACTIVITY_TABLE = "activities"

module.exports = { USER_TABLE, GROUP_TABLE, USER_TO_GROUP_TABLE, ACTIVITY_TABLE }