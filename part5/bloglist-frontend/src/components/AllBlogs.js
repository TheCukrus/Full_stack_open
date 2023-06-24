import Notification from "./Notification.js"
import NewBlogForm from "./NewBlogForm.js"
import Blog from "./Blog.js"
import Togglable from "./Togglable.js"
import { useRef } from "react"

const Blogs = ({ setBlogs, setNotification, notification, user, blogs, handleLogout }) =>
{
    //useRef
    const blogFormRef = useRef()

    return (
        <div>
            <h2>blogs</h2>

            <Notification notification={notification} />

            <p>{user.username} logged in <input id="logout-button" type="submit" value="Logout" onClick={handleLogout} /></p>

            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm setBlogs={setBlogs} blogFormRef={blogFormRef} setNotification={setNotification} />
            </Togglable>

            {
                blogs
                    .sort((a, b) => a.likes - b.likes)
                    .map(blog => (< Blog user={user} setBlogs={setBlogs} setNotification={setNotification} key={blog.id} blog={blog} />))
            }
        </div>
    )
}

export default Blogs