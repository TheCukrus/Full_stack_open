import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) =>
{
    const content = useField("text")
    const author = useField("text")
    const info = useField("text")
    const handleReset = () =>
    {
        content.reset()
        author.reset()
        info.reset()
    }

    const { reset: contentReset, ...contentProps } = content;
    const { reset: authorReset, ...authorProps } = author;
    const { reset: infoReset, ...infoProps } = info
    const navigate = useNavigate()

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate("/")
        props.setNotification(`A new anecdote ${content.value} created!`)
    }
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...contentProps} />
                </div>
                <div>
                    author
                    <input name='author' {...authorProps} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...infoProps} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew
