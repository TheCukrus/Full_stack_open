import "./Blog.css"
import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog, setNotification }) => 
{
  const [show, setShow] = useState(false)

  const increaseLikeCount = async () =>
  {
    try
    {
      const result = await blogs.updateLikes({ "likes": blog.likes + 1 }, blog.id)
      console.log(result)
    }
    catch (err)
    {
      setNotification({ "message": "Can't update like count", "nameOfClass": "error" })
    }
  }


  return (
    <div className="blog">
      {!show
        ?
        <div>
          {blog.title} {blog.author} <button onClick={() => setShow(blog.id)}>View</button>
        </div>
        :
        <div>
          {blog.title} {blog.author} <button onClick={() => setShow(false)}>Hide</button><br />
          <a href={blog.url}>{blog.url}</a> <br />
          Likes {blog.likes} <button onClick={increaseLikeCount}>Like</button><br />
          {blog.user.username}
        </div>}
    </div>
  )
}

export default Blog