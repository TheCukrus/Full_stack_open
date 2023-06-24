import "./Blog.css"
import { useState } from "react"
import blogService from "../services/blogs.js"

const Blog = ({ user, setBlogs, blog, setNotification }) =>
{
  const [show, setShow] = useState(false)

  const increaseLikeCount = async () =>
  {
    try
    {
      await blogService.updateLikes({ "likes": blog.likes + 1 }, blog.id)
      const fetchData = await blogService.getAll()
      await setBlogs(fetchData)
    }
    catch (err)
    {
      setNotification({ "message": "Can't update like count", "nameOfClass": "error" })
    }
  }

  const removeBlog = async () =>
  {
    try
    {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      {
        await blogService.remove(blog.id)
        const fetchData = await blogService.getAll()
        await setBlogs(fetchData)
        await setNotification({ "message": `Removed blog: ${blog.title}`, "nameOfClass": "success" })
      }
    }
    catch (err)
    {
      console.log(err)
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
          {user.username === blog.user.name
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