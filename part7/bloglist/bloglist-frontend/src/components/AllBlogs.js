import Notification from "./Notification.js"
import NewBlogForm from "./NewBlogForm.js"
import Blog from "./Blog.js"
import Togglable from "./Togglable.js"
import { useRef } from "react"

const Blogs = ({ setBlogs, user, blogs, handleLogout }) =>
{
    //useRef
    const blogFormRef = useRef()

    console.log(blogs)
    return (
        <div>
            <h2>blogs</h2>

            <Notification />

            <p>{user.username} logged in <input id="logout-button" type="submit" value="Logout" onClick={handleLogout} /></p>

            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm blogFormRef={blogFormRef} />
            </Togglable>

            {
                blogs
                    .sort((a, b) => a.likes - b.likes)
                    .map(blog => (< Blog user={user} setBlogs={setBlogs} key={blog.id} blog={blog} />))
            }
        </div>
    )
}

export default Blogs