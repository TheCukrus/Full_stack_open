import React from "react"
import { useRef } from "react"
import Togglable from "./Togglable.js"
import NewBlogForm from "./NewBlogForm.js"
import Blog from "./Blog.js"

const Home = ({ blogs }) =>
{
    //useRef
    const blogFormRef = useRef()

    return (
        <div>
            <h2>blog app</h2>

            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm blogFormRef={blogFormRef} />
            </Togglable>

            {
                blogs
                    .sort((a, b) => a.likes - b.likes)
                    .map(blog => (< Blog key={blog.id} blog={blog} />))
            }

        </div>
    )
}

export default Home