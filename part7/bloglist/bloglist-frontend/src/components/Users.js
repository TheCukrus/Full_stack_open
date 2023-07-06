import { useState, useEffect } from "react"
import userService from "../services/users.js"

const Users = () =>
{
    const [users, setUsers] = useState([])

    const fetchData = async () =>
    {
        const users = await userService.getAll()
        return setUsers(users)
    }

    useEffect(() =>
    {
        fetchData()
    }, [])

    console.log(users)
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((ele) => (
                        <tr key={ele.id}>
                            <td>{ele.name}</td>
                            <td>{ele.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Users