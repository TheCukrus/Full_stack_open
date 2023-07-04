import { useState, useContext } from "react"
import blogService from "../services/blogs.js"
import NotificationContext from "./NotificationContext.js"

const NewBlogForm = ({ setBlogs, blogFormRef }) =>
{
    // eslint-disable-next-line no-unused-vars
    const [notification, notificationDispatch] = useContext(NotificationContext)

    //useState
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")



    const titleOnChange = ({ target }) => setTitle(target.value)
    const authorOnChange = ({ target }) => setAuthor(target.value)
    const urlOnChange = ({ target }) => setUrl(target.value)

    const handleBlogOnClick = async (e) =>
    {
        e.preventDefault()

        const data = { title, author, url }

        const newBlog = await blogService.create(data)

        notificationDispatch({ type: "NOTIFICATION", payload: { message: `A new blog ${newBlog.title} by ${newBlog.author} added`, nameOfClass: "success" } })

        blogFormRef.current.toggleVisibility()
        setTitle("")
        setAuthor("")
        setUrl("")
        const fetchData = await blogService.getAll()
        await setBlogs(fetchData)
    }


    return (
        <div>
            <h1>Create new</h1>

            <form onSubmit={handleBlogOnClick}>
                Title:<input type="text" id="title-input" placeholder="write your title" value={title} onChange={titleOnChange} /><br />
                Author:<input type="text" id="author-input" placeholder="write your author" value={author} onChange={authorOnChange} /><br />
                Url:<input type="text" id="url-input" placeholder="blog url" value={url} onChange={urlOnChange} /><br />
                <input id="create-button" type="submit" value="create" />
            </form>
        </div>
    )
}

export default NewBlogForm