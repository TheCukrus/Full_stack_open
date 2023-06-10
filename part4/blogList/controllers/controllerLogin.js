const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const logger = require("../utils/logger")
const modelUser = require("../models/modelUser")
const express = require("express")

const loginRouter = express.Router()


loginRouter.post("/", async (request, response) =>
{
    try
    {

        const { username, password } = request.body

        const user = await modelUser.findOne({ username })

        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.password)

        if (!(user && passwordCorrect))
        {
            return response.status(401).json({
                message: "Invalid username or password"
            })
        }

        const userForToken = {
            username: user.username,
            id: user.id,
        }

        const token = jwt.sign(userForToken, process.env.JWT_SECRET)

        response.status(200).send({ token, username: user.username })
    }
    catch (err)
    {
        logger.error(err)
    }
})

module.exports = loginRouter