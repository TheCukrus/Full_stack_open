import "./Blog.css"
import { useState } from "react"

const Blog = ({ blog }) => 
{
  const [show, setShow] = useState(false)

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
          Likes {blog.likes} <button>Like</button><br />
          {blog.user.username}
        </div>}
    </div>
  )
}

export default Blog