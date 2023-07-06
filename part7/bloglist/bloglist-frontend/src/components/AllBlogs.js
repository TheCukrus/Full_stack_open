import Notification from "./Notification.js"
import { useContext, useState, useEffect } from "react"
import UserContext from "./UserContext.js"
import { Routes, Route, useMatch } from "react-router-dom"
import Home from "./Home.js"
import Users from "./Users.js"
import SingleUser from "./SingleUser.js"
import userService from "../services/users.js"
import SingleBlog from "./SingleBlog.js"

const Blogs = ({ blogs }) =>
{
    const [user, userDispatch] = useContext(UserContext)

    const [users, setUsers] = useState([])

    const handleLogout = () =>
    {
        window.localStorage.clear()
        userDispatch({ type: "LOGOUT" })
    }

    const matchUser = useMatch("/users/:id")
    const matchingUser = matchUser
        ? users.find((ele) => ele.id === matchUser.params.id)
        : null

    const matchBlog = useMatch("/blogs/:id")
    const matchingBlogs = matchBlog
        ? blogs.find((ele) => ele.id === matchBlog.params.id)
        : null

    const fetchData = async () =>
    {
        const users = await userService.getAll()
        return setUsers(users)
    }

    useEffect(() =>
    {
        fetchData()
    }, [])

    return (
        <div>
            <h2>blogs</h2>

            <Notification />

            <p>{user.username} logged in </p>
            <input id="logout-button" type="submit" value="Logout" onClick={handleLogout} />

            <Routes>
                <Route path="/" element={<Home blogs={blogs} />} />
                <Route path="/users" element={<Users users={users} />} />
                <Route path="/users/:id" element={<SingleUser user={matchingUser} />} />
                <Route path="/blogs/:id" element={<SingleBlog blog={matchingBlogs} />} />
            </Routes>


        </div>
    )
}

export default Blogs