import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog.js"


describe("Blog file testing", () =>
{
    let blog = {
        title: "testing react app",
        author: "author tester",
        url: "http://superReactTests.com",
        likes: 5,
        user: {
            username: "testuser",
        },
    }

    test("renders content", () =>
    {
        render(<Blog blog={blog} />)

        const title = screen.getByText(/testing react app/i)
        const author = screen.getByText(/author tester/i)

        expect(title).toBeInTheDocument()
        expect(author).toBeInTheDocument()
    })

    test("does not render blog URL and number of likes by default", () =>
    {

        render(<Blog blog={blog} />)

        const url = screen.queryByText(blog.url)
        const likes = screen.queryByText(`Likes ${blog.likes}`)

        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test("shows blog URL and number of likes when button is clicked", async () =>
    {

        render(<Blog blog={blog} />)

        const user = userEvent.setup()
        const button = screen.getByText("View")
        await user.click(button)

        const url = await screen.findByText(blog.url)
        const likes = await screen.findByText(/Likes 5/)

        expect(url).toBeInTheDocument()
        expect(likes).toBeInTheDocument()
    })

})