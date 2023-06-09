const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "username": String,
    "name": String,
    "password": String
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const modelUser = mongoose.model("user", userSchema, "user")

module.exports = modelUser