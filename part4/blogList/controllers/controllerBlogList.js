const Blog = require("../models/modelBlogList");
const express = require("express");

const blogListRouter = express.Router();

blogListRouter.get("/", (request, response) =>
{
    Blog
        .find({})
        .then(blogs =>
        {
            response.json(blogs)
        })
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
