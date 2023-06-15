import Notification from "./Notification"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"
import Togglable from "./Togglable"
import { useRef } from "react"

const Blogs = ({ setNotification, notification, user, blogs, handleLogout }) =>
{

    //useRef
    const blogFormRef = useRef()

    return (
        <div>
            <h2>blogs</h2>

            <Notification notification={notification} />

            <p>{user.username} logged in <input type="submit" value="Logout" onClick={handleLogout} /></p>

            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm blogFormRef={blogFormRef} setNotification={setNotification} />
            </Togglable>

            {blogs.map(blog =>
            (
                < Blog setNotification={setNotification} key={blog.id} blog={blog} />
            )
            )}
        </div>
    )
}

export default Blogs