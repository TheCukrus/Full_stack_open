const blog = require("../models/modelBlogList");
const express = require("express");
const logger = require("../utils/logger");
const modelUser = require("../models/modelUser");
const jwt = require("jsonwebtoken")

const blogListRouter = express.Router();

//Check for token
const getTokenFrom = request =>
{
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer "))
    {
        return authorization.replace("Bearer ", "")
    }
    return null
}

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
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken.id)
        {
            return response.status(401).json({ message: "Token invalid" })
        }

        const user = await modelUser.findById(decodedToken.id)

        if (!request.body.title || !request.body.url)
        {
            return response.status(400).json({ message: logger.error("Input missing") })
        }

        // const user = await modelUser.findById(request.body.user)

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
