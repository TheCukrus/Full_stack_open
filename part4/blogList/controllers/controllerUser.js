const express = require("express")
const modelUser = require("../models/modelUser")
const logger = require("../utils/logger")
const bcrypt = require("bcryptjs")

const controllerUser = express.Router()

controllerUser.post("/", async (request, response) =>
{
    const { username, name, password } = request.body

    const setRounds = 10;
    const passwordHash = bcrypt.hash(password, setRounds)
    try
    {
        const newUser = modelUser.create({ username, name, password })

        response.status(201).json(newUser)
    }
    catch (err)
    {
        logger.error(err)
    }
})


module.exports = controllerUser