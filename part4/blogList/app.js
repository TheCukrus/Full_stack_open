const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const controllerBlogList = require("./controllers/controllerBlogList");
const { MONGODB } = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

mongoose.connect(MONGODB)
    .then(() => logger.info("Connect to mongoDB"))
    .catch((error) => logger.error("Error connecting to mongoDB", error.message))


app.use(cors())
// app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", controllerBlogList)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;