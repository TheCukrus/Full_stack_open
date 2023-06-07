const Blog = require("../models/modelBlogList");
const express = require("express");

const blogListRouter = express.Router();

blogListRouter.get("/", async (request, response) =>
{
    const result = await Blog.find({})
    response.status(200).json(result)
})

blogListRouter.post("/", (request, response) =>
{
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result =>
        {
            response.status(201).json(result)
        })
})

module.exports = blogListRouter;
