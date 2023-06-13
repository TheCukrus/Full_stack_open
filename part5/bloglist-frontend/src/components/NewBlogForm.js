
const NewBlogForm = ({ handleBlogOnClick, title, author, url, titleOnChange, authorOnChange, urlOnChange }) =>
{
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