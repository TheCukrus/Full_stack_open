import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () =>
{
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleOnClick = async (e) =>
  {
    e.preventDefault()
    const user = await loginService.login({ username, password })

    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem("token", JSON.stringify(user))
    setUsername("")
    setPassword("")
  }

  const handleLogout = () =>
  {
    window.localStorage.clear()
    setUser(null)
  }

  const handleBlogOnClick = async (e) =>
  {
    e.preventDefault()

    const data = { title, author, url }

    const newBlog = await blogService.create(data)

    console.log(newBlog)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const usernameOnChange = ({ target }) => setUsername(target.value)
  const passwordOnChange = ({ target }) => setPassword(target.value)

  const titleOnChange = ({ target }) => setTitle(target.value)
  const authorOnChange = ({ target }) => setAuthor(target.value)
  const urlOnChange = ({ target }) => setUrl(target.value)

  //Check if user is in localStorage
  useEffect(() =>
  {
    const localStorage = JSON.parse(window.localStorage.getItem("token"))
    setUser(localStorage)
  }, [])

  //Get all blogs
  useEffect(() =>
  {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [blogs])

  return (
    <div>
      {!user
        ?
        <LoginForm handleOnClick={handleOnClick} usernameOnChange={usernameOnChange} passwordOnChange={passwordOnChange} username={username} password={password} />
        :
        <div>
          <h2>blogs</h2>

          <p>{user.username} logged in <input type="submit" value="Logout" onClick={handleLogout} /></p>

          <div>
            <h1>Create new</h1>

            <form onSubmit={handleBlogOnClick}>
              Title:<input type="text" value={title} onChange={titleOnChange} /><br />
              Author:<input type="text" value={author} onChange={authorOnChange} /><br />
              Url:<input type="text" value={url} onChange={urlOnChange} /><br />
              <input type="submit" value="create" />
            </form>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App

//UsernameForTesting
//password123