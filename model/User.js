const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }

})

const User = model("user", UserSchema)

module.exports = User