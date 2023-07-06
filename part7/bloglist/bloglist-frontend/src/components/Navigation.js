import React, { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "./UserContext.js"
import "./Navigation.css"

const Navigation = () =>
{
    const [user, userDispatch] = useContext(UserContext)

    const handleLogout = () =>
    {
        window.localStorage.clear()
        userDispatch({ type: "LOGOUT" })
    }

    return (
        <div className="navbar">
            <Link to="/users" className="nav-link">user</Link>
            <Link to="/" className="nav-link">blogs</Link>
            <span className="user-info">
                {user.username} logged in
                <input id="logout-button" type="submit" value="Logout" onClick={handleLogout} />
            </span>
        </div>
    )
}

export default Navigation