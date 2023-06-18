import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog.js"

test("renders content", () =>
{
    const blog = {
        "title": "testing react app",
        "author": "author tester",
        "url": "http:superReactTests.com"
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText(/testing react app/i)
    const author = screen.getByText(/author tester/i)

    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
})

test("does not render blog URL and number of likes by default", () =>
{
    const blog = {
        title: "testing react app",
        author: "author tester",
        url: "http://superReactTests.com",
        likes: 5,
        user: {
            username: "testuser",
        },
    }

    render(<Blog blog={blog} />)

    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(`Likes ${blog.likes}`)

    expect(url).toBeNull()
    expect(likes).toBeNull()
})