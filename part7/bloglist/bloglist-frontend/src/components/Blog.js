import "./Blog.css"
import { useState, useContext } from "react"
import blogService from "../services/blogs.js"
import NotificationContext from "./NotificationContext.js"
import { useQueryClient, useMutation } from "react-query"

const Blog = ({ user, blog }) =>
{
  const queryClient = useQueryClient()

  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const [show, setShow] = useState(false)

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

  const increaseLikeCount = () =>
  {
    newVoteMutation.mutate(blog)
    notificationDispatch({ type: "NOTIFICATION", payload: { message: `Voted for ${blog.title}`, nameOfClass: "success" } })
  }

  const removeBlog = () =>
  {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      newRemoveMutation.mutate(blog.id)
      notificationDispatch({ type: "NOTIFICATION", payload: { message: `Removed blog: ${blog.title}`, nameOfClass: "success" } })
    }
  }

  const toggleInfo = () => setShow((prev) => !prev)

  return (
    <div className="blog">
      {!show
        ?
        <div>
          {blog.title} {blog.author} <button id="view" onClick={toggleInfo}>View</button>
        </div>
        :
        <div>
          {blog.title} {blog.author} <button id="hide" onClick={toggleInfo}>Hide</button><br />
          <a href={blog.url}>{blog.url}</a> <br />
          Likes {blog.likes} <button id="like" onClick={increaseLikeCount}>Like</button><br />
          {blog.user.username}<br />
          {user.username === blog.user.username
            ?
            <button id="remove" className="removeButton" onClick={removeBlog}>Remove</button>
            :
            null
          }
        </div>}
    </div>
  )
}

export default Blog