import { useState, useEffect, useContext } from "react"
import LoginForm from "./components/LoginForm.js"
import blogService from "./services/blogs.js"
import loginService from "./services/login.js"
import AllBlogs from "./components/AllBlogs.js"
import NotificationContext from "./components/NotificationContext.js"
import UserContext from "./components/UserContext.js"

// eslint-disable-next-line no-unused-vars
import { useQuery } from "react-query"

const App = () =>
{
  //useStates
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  const handleOnClick = async (e) =>
  {
    e.preventDefault()
    const user = await loginService.login({ username, password })

    setUsername("")
    setPassword("")

    if (!user)
    {
      return notificationDispatch({ type: "NOTIFICATION", payload: { message: "Wrong username or password", nameOfClass: "error" } })
    }

    userDispatch({ type: "LOGIN", payload: user })
    window.localStorage.setItem("token", JSON.stringify(user))
  }

  const usernameOnChange = ({ target }) => setUsername(target.value)
  const passwordOnChange = ({ target }) => setPassword(target.value)

  //Check if user is in localStorage
  useEffect(() =>
  {
    const localStorage = JSON.parse(window.localStorage.getItem("token"))
    userDispatch({ type: "LOGIN", payload: localStorage })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchingAllBlogs = useQuery("blogs", blogService.getAll,
    {
      retry: false
    })

  if (fetchingAllBlogs.isLoading)
  {
    return (
      <div>
        Loading blogs...
      </div>
    )
  }

  if (fetchingAllBlogs.isError)
  {
    return (
      <div>
        Blogs service not available due to problems in server
      </div>
    )
  }

  const blogs = fetchingAllBlogs.data

  return (
    <div>
      {
        !user
          ?
          <LoginForm handleOnClick={handleOnClick} usernameOnChange={usernameOnChange} passwordOnChange={passwordOnChange} username={username} password={password} />
          :
          <AllBlogs blogs={blogs} />
      }
    </div>
  )
}

export default App