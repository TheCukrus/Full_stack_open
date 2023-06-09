const express = require("express")
const modelUser = require("../models/modelUser")
const logger = require("../utils/logger")
const bcrypt = require("bcryptjs")

const controllerUser = express.Router()

controllerUser.get("/", async (request, response) =>
{
    try
    {
        const users = await modelUser.find({})

        response.status(200).json(users)
    }
    catch (err)
    {
        logger.error(err)
    }
})

controllerUser.post("/", async (request, response) =>
{
    const { username, name, password } = request.body

    const setRounds = 10;
    const passwordHash = await bcrypt.hash(password, setRounds)
    try
    {
        const newUser = await modelUser.create({
            "username": username,
            "name": name,
            "password": passwordHash
        })

        response.status(201).json(newUser)
    }
    catch (err)
    {
        logger.error(err)
    }
})


module.exports = controllerUser