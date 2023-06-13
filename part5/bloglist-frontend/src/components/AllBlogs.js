import Notification from "./Notification"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"

const Blogs = ({ notification, user, handleBlogOnClick, blogs, handleLogout, title, author, url, titleOnChange, authorOnChange, urlOnChange }) =>
{
    return (
        <div>
            <h2>blogs</h2>

            <Notification notification={notification} />

            <p>{user.username} logged in <input type="submit" value="Logout" onClick={handleLogout} /></p>

            <NewBlogForm handleBlogOnClick={handleBlogOnClick} title={title} author={author} url={url} titleOnChange={titleOnChange} authorOnChange={authorOnChange} urlOnChange={urlOnChange} />

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Blogs