import React from "react"
import "@testing-library/jest-dom/extend-expect"
import "@testing-library/jest-dom"
import "@testing-library/react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog.js"
import blogService from "../services/blogs.js"

// Mock the blogService methods
jest.mock("../services/blogs.js", () => ({
    __esModule: true,
    default: {
        getAll: jest.fn(),
        create: jest.fn(),
        updateLikes: jest.fn(),
        remove: jest.fn()
    },
}))

describe("Blog file testing", () =>
{
    let blog = {
        id: "valid-id",
        title: "testing react app",
        author: "author tester",
        url: "http://superReactTests.com",
        likes: 5,
        user: {
            username: "testuser",
        },
    }

    test("render content", () =>
    {
        const view = render(<Blog blog={blog} />)

        expect(view.container).toHaveTextContent(blog.title)
        expect(view.container).toHaveTextContent(blog.author)
        expect(view.container).not.toHaveTextContent(blog.likes)
        expect(view.container).not.toHaveTextContent(blog.url)

    })

    test("shows blog URL and number of likes when button is clicked", async () =>
    {
        const view = render(<Blog blog={blog} />)

        const user = userEvent.setup()
        const button = screen.getByText("View")
        await user.click(button)

        expect(view.container).toHaveTextContent(blog.likes)
        expect(view.container).toHaveTextContent(blog.url)
    })

    test("twice pressed like button must be called twice in component", async () =>
    {
        // Mock blogService.updateLikes to just resolve when called
        blogService.updateLikes.mockResolvedValue()

        render(<Blog blog={blog} setBlogs={() => { }} setNotification={() => { }} />)

        const user = userEvent.setup()
        const button = screen.getByText("View")
        await user.click(button)

        const likeButton = screen.getByText("Like")

        // Click the like button twice
        await user.click(likeButton)
        await user.click(likeButton)

        // Check if blogService.updateLikes was called twice
        expect(blogService.updateLikes).toHaveBeenCalledTimes(2)
    })
})