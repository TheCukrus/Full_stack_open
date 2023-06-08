const blog = require("../models/modelBlogList");
const express = require("express");
const logger = require("../utils/logger")

const blogListRouter = express.Router();

blogListRouter.get("/", async (request, response) =>
{
    try
    {
        const result = await blog.find({})
        response.status(200).json(result)
    }
    catch (err)
    {
        logger.error(err)
    }
})

blogListRouter.post("/", async (request, response) =>
{
    try
    {
        if (!request.body.title || !request.body.url)
        {
            response.status(400).json({ message: logger.error("Input missing") })
        }

        const result = await blog.create(request.body)
        response.status(201).json(request.body)
    }
    catch (err)
    {
        logger.error(err);
    }
})

module.exports = blogListRouter;
