import Notification from "./Notification.js"
import { useContext } from "react"
import UserContext from "./UserContext.js"
import { Routes, Route } from "react-router-dom"
import Home from "./Home.js"
import Users from "./Users.js"

const Blogs = ({ blogs }) =>
{
    const [user, userDispatch] = useContext(UserContext)

    const handleLogout = () =>
    {
        window.localStorage.clear()
        userDispatch({ type: "LOGOUT" })
    }


    return (
        <div>
            <h2>blogs</h2>

            <Notification />

            <p>{user.username} logged in </p>
            <input id="logout-button" type="submit" value="Logout" onClick={handleLogout} />

            <Routes>
                <Route path="/" element={<Home blogs={blogs} />} />
                <Route path="/users" element={<Users />} />
            </Routes>


        </div>
    )
}

export default Blogs