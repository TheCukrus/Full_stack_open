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
  const [temp, setTemp] = useState(false)

  const handleOnClick = async (e) =>
  {
    e.preventDefault()
    const user = await loginService.login({ username, password })

    setUser(user)
    window.localStorage.setItem("token", JSON.stringify(user))
    setUsername("")
    setPassword("")
  }

  const handleLogout = () =>
  {
    window.localStorage.clear()
    setUser(null)
  }

  const usernameOnChange = ({ target }) => setUsername(target.value)
  const passwordOnChange = ({ target }) => setPassword(target.value)

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
  }, [])

  return (
    <div>
      {!user
        ?
        <LoginForm handleOnClick={handleOnClick} usernameOnChange={usernameOnChange} passwordOnChange={passwordOnChange} username={username} password={password} />
        :
        <div>
          <h2>blogs</h2>

          <p>{user.username} logged in <input type="submit" value="Logout" onClick={handleLogout} /></p>
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