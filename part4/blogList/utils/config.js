const path = require("path")

require("dotenv").config({ path: path.resolve(__dirname, "../.env") })


const PORT = process.env.PORT;

const MONGODB = process.env.NODE_ENV === "test"
? process.env.TEST_MONGODB
: process.env.MONGODB

module.exports = {
    PORT,
    MONGODB,
}