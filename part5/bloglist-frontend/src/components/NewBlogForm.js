import { useState } from "react"
import blogService from "../services/blogs.js"

const NewBlogForm = ({ setBlogs, blogFormRef, setNotification }) =>
{
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

        setNotification({ "message": `A new blog ${newBlog.title} by ${newBlog.author} added`, "nameOfClass": "success" })
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
                Title:<input type="text" value={title} onChange={titleOnChange} /><br />
                Author:<input type="text" value={author} onChange={authorOnChange} /><br />
                Url:<input type="text" value={url} onChange={urlOnChange} /><br />
                <input type="submit" value="create" />
            </form>
        </div>
    )
}

export default NewBlogForm