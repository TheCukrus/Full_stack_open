import Notification from "./Notification"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"
import Togglable from "./Togglable"
import { useRef } from "react"

const Blogs = ({ setNotification, notification, user, blogs, handleLogout }) =>
{

    //useRef
    const blogFormRef = useRef()

    // const blogArr = []

    // blogs.map(blog =>
    // (
    //     blogArr.push(< Blog setNotification={setNotification} key={blog.id} blog={blog} />)
    // ))

    return (
        <div>
            <h2>blogs</h2>

            <Notification notification={notification} />

            <p>{user.username} logged in <input type="submit" value="Logout" onClick={handleLogout} /></p>

            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm blogFormRef={blogFormRef} setNotification={setNotification} />
            </Togglable>

            {/* {blogArr.sort((a, b) => Number(a.likes) - Number(b.likes))} */}
            {
                blogs
                    .sort((a, b) => a.likes - b.likes)
                    .map(blog => (< Blog setNotification={setNotification} key={blog.id} blog={blog} />))
            }

        </div>
    )
}

export default Blogs