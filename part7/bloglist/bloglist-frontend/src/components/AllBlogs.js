import Notification from "./Notification.js"
import { useContext, useState, useEffect } from "react"
import UserContext from "./UserContext.js"
import { Routes, Route, useMatch } from "react-router-dom"
import Home from "./Home.js"
import Users from "./Users.js"
import SingleUser from "./SingleUser.js"
import userService from "../services/users.js"

const Blogs = ({ blogs }) =>
{
    const [user, userDispatch] = useContext(UserContext)

    const [users, setUsers] = useState([])

    const handleLogout = () =>
    {
        window.localStorage.clear()
        userDispatch({ type: "LOGOUT" })
    }

    const match = useMatch("/users/:id")
    const matchingUser = match
        ? users.find((ele) => ele.id === match.params.id)
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
            </Routes>


        </div>
    )
}

export default Blogs