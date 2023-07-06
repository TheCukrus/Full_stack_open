import { useContext } from "react"
import { useQueryClient, useMutation } from "react-query"

import UserContext from "./UserContext.js"
import NotificationContext from "./NotificationContext.js"
import blogService from "../services/blogs.js"

const SingleBlog = ({ blog }) =>
{
    const queryClient = useQueryClient()

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

    console.log(blog)
    return (
        <div>
            <h2>blog app</h2>

            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a> <br />
            Likes {blog.likes} <button id="like" onClick={increaseLikeCount}>Like</button><br />
            Added by {blog.user.username}<br />
            {user.username === blog.user.username
                ?
                <button id="remove" className="removeButton" onClick={removeBlog}>Remove</button>
                :
                null
            }

            <h4>Comments</h4>
            <ul>
                {blog.comments.map((ele) => <li key={ele}>{ele}</li>)}
            </ul>

        </div>
    )
}

export default SingleBlog