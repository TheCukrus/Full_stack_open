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

blogListRouter.get("/:id", async (request, response) =>
{
    try
    {
        const result = await blog.find({ "id": request.params._id })

        if (result.length === 0)
        {
            return response.status(404).end()
        }

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

        await blog.create(request.body)
        response.status(201).json(request.body)
    }
    catch (err)
    {
        logger.error(err);
    }
})

blogListRouter.put("/:id", async (request, response) =>
{
    try
    {
        const temp = await blog.findByIdAndUpdate(request.params.id, { "likes": request.body.likes }, { new: true })
        response.status(200).json(temp)

    }
    catch (err)
    {
        logger.error(err)
    }
})

blogListRouter.delete("/:id", async (request, response) =>
{
    try
    {
        await blog.findByIdAndDelete(request.params.id)

        const check = await blog.find({ "id": request.params.id })

        if (check.length === 0)
        {
            return response.status(204).end()
        }
        return response.status(400).end()
    }
    catch (err)
    {
        logger.error(err)
    }
})

module.exports = blogListRouter;
