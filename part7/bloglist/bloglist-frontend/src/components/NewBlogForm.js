import { useState, useContext } from "react"
import blogService from "../services/blogs.js"
import NotificationContext from "./NotificationContext.js"
import { useMutation, useQueryClient } from "react-query"
import { Form, Button } from "react-bootstrap"

const NewBlogForm = ({ blogFormRef }) =>
{
    const queryClient = useQueryClient()

    // eslint-disable-next-line no-unused-vars
    const [notification, notificationDispatch] = useContext(NotificationContext)

    //useState
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    //onChange functions
    const titleOnChange = ({ target }) => setTitle(target.value)
    const authorOnChange = ({ target }) => setAuthor(target.value)
    const urlOnChange = ({ target }) => setUrl(target.value)

    const newBlogMutation = useMutation(blogService.create,
        {
            onSuccess: () =>
            {
                queryClient.invalidateQueries("blogs")
            }
        })

    const handleBlogOnClick = async (e) =>
    {
        e.preventDefault()

        const data = { title, author, url }

        newBlogMutation.mutate(data)

        notificationDispatch({ type: "NOTIFICATION", payload: { message: `A new blog ${data.title} by ${data.author} added`, nameOfClass: "success" } })

        blogFormRef.current.toggleVisibility()
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (
        <div>
            <h1>Create new</h1>

            <Form onSubmit={handleBlogOnClick}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        id="title-input"
                        placeholder="write your title"
                        value={title}
                        onChange={titleOnChange}
                    />
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        type="text"
                        id="author-input"
                        placeholder="write your author"
                        value={author}
                        onChange={authorOnChange}
                    />
                    <Form.Label>Url:</Form.Label>
                    <Form.Control
                        type="text"
                        id="url-input"
                        placeholder="blog url"
                        value={url}
                        onChange={urlOnChange}
                    />
                    <Button
                        id="create-button"
                        type="submit"
                        value="create"
                        variant="primary"
                    >Create</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default NewBlogForm