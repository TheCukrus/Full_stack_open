import React from "react"
import "@testing-library/jest-dom/extend-expect"
import "@testing-library/jest-dom"
import "@testing-library/react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlogForm from "./NewBlogForm.js"
import blogService from "../services/blogs"

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

describe("New Blog form testing", () =>
{

    test("View if form has values", () =>
    {
        const view = render(<NewBlogForm />)


        expect(view.container).toHaveTextContent("Title")
        expect(view.container).toHaveTextContent("Author")
        expect(view.container).toHaveTextContent("Url")
    })

    test("create blog", async () =>
    {
        const setBlogs = jest.fn()
        const setNotification = jest.fn()

        // Mock implementation of blog creation
        blogService.create.mockResolvedValue({
            title: "Title test form",
            author: "Jevgenij",
            url: "http://testing.machine",
        })

        const mockToggleVisibility = jest.fn()
        const blogFormRef = { current: { toggleVisibility: mockToggleVisibility } }
        render(
            <NewBlogForm
                setBlogs={setBlogs}
                blogFormRef={blogFormRef}
                setNotification={setNotification}
            />
        )

        const inputTitle = screen.getByPlaceholderText("write your title")
        const inputAuthor = screen.getByPlaceholderText("write your author")
        const inputUrl = screen.getByPlaceholderText("blog url")
        const createButton = screen.getByText("create")

        // Simulate user typing
        await userEvent.type(inputTitle, "Title test form")
        await userEvent.type(inputAuthor, "Jevgenij")
        await userEvent.type(inputUrl, "http://testing.machine")
        await userEvent.click(createButton)

        // Click button and wait for any async actions to complete
        userEvent.click(createButton)
        await waitFor(() => expect(setNotification).toHaveBeenCalledTimes(1))

        // Validate results
        expect(setNotification).toHaveBeenCalledWith({
            message: "A new blog Title test form by Jevgenij added",
            nameOfClass: "success",
        })

        // Check that blogService.create has been called once with correct arguments
        expect(blogService.create).toHaveBeenCalledTimes(1)
        expect(blogService.create).toHaveBeenCalledWith({
            title: "Title test form",
            author: "Jevgenij",
            url: "http://testing.machine",
        })

        // Check that setBlogs and input fields reset have been called once
        expect(setBlogs).toHaveBeenCalledTimes(1)
        expect(inputTitle).toHaveValue("")
        expect(inputAuthor).toHaveValue("")
        expect(inputUrl).toHaveValue("")
    })
})