import Notification from "./Notification.js"
import { useState, useEffect } from "react"
import { Routes, Route, useMatch } from "react-router-dom"
import Home from "./Home.js"
import Users from "./Users.js"
import SingleUser from "./SingleUser.js"
import userService from "../services/users.js"
import SingleBlog from "./SingleBlog.js"
import Navigation from "./Navigation.js"

const Blogs = ({ blogs }) =>
{
    const [users, setUsers] = useState([])

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
            <Navigation />
            <Notification />

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