const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const controllerBlogList = require("./controllers/controllerBlogList");
const controllerUser = require("./controllers/controllerUser")
const controllerLogin = require("./controllers/controllerLogin")
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
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.tokenExtractor, middleware.userExtractor, controllerBlogList)
app.use("/api/users", controllerUser)
app.use("/api/login", middleware.tokenExtractor, controllerLogin)

if (process.env.NODE_ENV === "test")
{
    const testingRouter = require("./controllers/controllerTesting")
    app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;