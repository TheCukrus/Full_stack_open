import { useContext, useState } from "react"
import { useQueryClient, useMutation } from "react-query"
import { Form, Button } from "react-bootstrap"

import UserContext from "./UserContext.js"
import NotificationContext from "./NotificationContext.js"
import blogService from "../services/blogs.js"

const SingleBlog = ({ blog }) =>
{
    const queryClient = useQueryClient()

    const [comment, setComment] = useState("")

    const commentOnChange = e => setComment(e.target.value)

    const commentOnSubmit = async (e) =>
    {
        e.preventDefault()

        await blogService.addComment(blog.id, { comment: comment })
        setComment("")
    }

    // eslint-disable-next-line no-unused-vars
    const [user, userDispatch] = useContext(UserContext)

    // eslint-disable-next-line no-unused-vars
    const [notification, notificationDispatch] = useContext(NotificationContext)

    const newVoteMutation = useMutation(blogService.updateLikes, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries("blogs")
        }
    })

    const newRemoveMutation = useMutation(blogService.remove, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries("blogs")
        }
    })

    const removeBlog = () =>
    {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
        {
            newRemoveMutation.mutate(blog.id)
            notificationDispatch({ type: "NOTIFICATION", payload: { message: `Removed blog: ${blog.title}`, nameOfClass: "success" } })
        }
    }

    const increaseLikeCount = () =>
    {
        newVoteMutation.mutate(blog)
        notificationDispatch({ type: "NOTIFICATION", payload: { message: `Voted for ${blog.title}`, nameOfClass: "success" } })
    }

    // console.log(blog)
    return (
        <div>
            <h2>blog app</h2>

            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a> <br />
            Likes {blog.likes} <Button id="like" variant="primary" size="sm" onClick={increaseLikeCount}>Like</Button><br />
            Added by {blog.user.username}<br />
            {user.username === blog.user.username
                ?
                <Button id="remove" variant="danger" size="sm" onClick={removeBlog}>Remove</Button>
                :
                null
            }

            <h4>Comments</h4>

            <Form onSubmit={commentOnSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        value={comment}
                        onChange={commentOnChange}
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        value="Add comment"
                    >Add comment</Button>
                </Form.Group>
            </Form>

            <ul>
                {blog.comments.map((ele) => <li key={ele}>{ele}</li>)}
            </ul>

        </div>
    )
}

export default SingleBlog