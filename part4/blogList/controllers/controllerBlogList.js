const blog = require("../models/modelBlogList");
const express = require("express");
const logger = require("../utils/logger");
const modelUser = require("../models/modelUser");
const jwt = require("jsonwebtoken")

const blogListRouter = express.Router();

blogListRouter.get("/", async (request, response) =>
{
    try
    {
        const result = await blog.find({}).populate("user", { "username": 1, "name": 1 })
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
        const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)

        if (!decodedToken.id)
        {
            return response.status(401).json({ message: "Token invalid" })
        }

        const user = await modelUser.findById(decodedToken.id)

        if (!request.body.title || !request.body.url)
        {
            return response.status(400).json({ message: logger.error("Input missing") })
        }

        const newBlog = new blog({
            "title": request.body.title,
            "author": request.body.author,
            "url": request.body.url,
            "likes": request.body.likes,
            "user": user.id
        })

        const savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
    catch (err)
    {
        logger.error(err);
        response.status(500).json({ message: "Internal server error" })
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
        const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)

        if (!decodedToken.id)
        {
            return response.status(401).json({ message: "Token invalid" })
        }

        const blogCheck = await blog.findById(request.params.id)

        if (!(blogCheck.user.toString() === decodedToken.id))
        {
            return response.status(400).json({ message: "Delete this blog can only creator" })
        }

        const check = await blog.deleteOne({ "_id": request.params.id })

        if (check.deletedCount === 1)
        {
            return response.status(204).end()
        }
        return response.status(400).end()
    }
    catch (err)
    {
        logger.error(err)
        response.status(500).json({ message: "Internal server error" })
    }
})

module.exports = blogListRouter;
