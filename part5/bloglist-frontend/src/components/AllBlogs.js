import Notification from "./Notification"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"
import Togglable from "./Togglable"
import { useRef } from "react"

const Blogs = ({ setBlogs, setNotification, notification, user, blogs, handleLogout }) =>
{
    //useRef
    const blogFormRef = useRef()

    return (
        <div>
            <h2>blogs</h2>

            <Notification notification={notification} />

            <p>{user.username} logged in <input type="submit" value="Logout" onClick={handleLogout} /></p>

            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm setBlogs={setBlogs} blogFormRef={blogFormRef} setNotification={setNotification} />
            </Togglable>

            {
                blogs
                    .sort((a, b) => a.likes - b.likes)
                    .map(blog => (< Blog setBlogs={setBlogs} setNotification={setNotification} key={blog.id} blog={blog} />))
            }
        </div>
    )
}

export default Blogs