const express = require("express")
const modelUser = require("../models/modelUser")
const logger = require("../utils/logger")
const bcrypt = require("bcryptjs")

const controllerUser = express.Router()

controllerUser.get("/", async (request, response) =>
{
    try
    {
        const users = await modelUser.find({}).populate("blogs", { "url": 1, "title": 1, "author": 1, })

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

    if (!username)
    {
        return response.status(400).json({ message: "Username field is empty" })
    }

    if (!password)
    {
        return response.status(400).json({ message: "Password field is empty" })
    }

    if (username.length < 3 || password.length < 3)
    {
        return response.status(400).json({ message: "input must contain minimum 3 characters" })
    }

    const setRounds = 10;
    const passwordHash = await bcrypt.hash(password, setRounds)
    try
    {

        const usernameChecker = await modelUser.find({ "username": username })

        if (usernameChecker.length !== 0)
        {
            return response.status(400).json({ message: "Username is taken" })
        }

        const newUser = await modelUser.create({
            "username": username,
            "name": name,
            "password": passwordHash
        })

        response.status(201).json({ message: "User created" })
    }
    catch (err)
    {
        logger.error(err)
    }
})


module.exports = controllerUser