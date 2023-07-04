const testingRouter = require("express").Router()
const modelBlogList = require("../models/modelBlogList")
const modelUser = require("../models/modelUser")

testingRouter.post("/reset", async (requrest, response) =>
{
    try
    {
        await modelBlogList.deleteMany({})
        await modelUser.deleteMany({})
        response.status(204).end()
    }
    catch (err)
    {
        console.log(err)
        response.status(500).end()
    }
})

module.exports = testingRouter;