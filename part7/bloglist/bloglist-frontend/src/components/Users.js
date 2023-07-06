import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = ({ users }) =>
{

    return (
        <div>
            <h1>Users</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((ele) => (
                        <tr key={ele.id}>
                            <td><Link to={`/users/${ele.id}`}>{ele.name}</Link></td>
                            <td>{ele.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    )
}

export default Users