import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm.js"
// import blogService from "./services/blogs.js"
// import loginService from "./services/login.js"
// import AllBlogs from "./components/AllBlogs.js"

const App = () =>
{
  // //useStates
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  const handleOnClick = async (e) =>
  {
    e.preventDefault()
    // const user = await loginService.login({ username, password })

    // setUsername("")
    // setPassword("")

    if (!user)
    {
      return setNotification({ "message": "Wrong username or password", "nameOfClass": "error" })
    }
    setUser(user)
    window.localStorage.setItem("token", JSON.stringify(user))
  }

  // const handleLogout = () =>
  // {
  //   window.localStorage.clear()
  //   setUser(null)
  // }


  const usernameOnChange = ({ target }) => setUsername(target.value)
  const passwordOnChange = ({ target }) => setPassword(target.value)


  // //Check if user is in localStorage
  // useEffect(() =>
  // {
  //   const localStorage = JSON.parse(window.localStorage.getItem("token"))
  //   setUser(localStorage)
  // }, [])

  // //Get all blogs
  // useEffect(() =>
  // {
  //   blogService.getAll().then(blogs => setBlogs(blogs))
  // }, [])

  useEffect(() => { setTimeout(() => { setNotification(null) }, 5000) }, [notification])

  return (
    <div>
      {/*   {
        !user
   ? */}
      <LoginForm notification={notification} handleOnClick={handleOnClick} usernameOnChange={usernameOnChange} passwordOnChange={passwordOnChange} username={username} password={password} />
      {/*  :
      <AllBlogs setBlogs={setBlogs} setNotification={setNotification} notification={notification} user={user} blogs={blogs} handleLogout={handleLogout} />
      }*/}
    </div>
  )
}

export default App

//UsernameForTesting
//password123