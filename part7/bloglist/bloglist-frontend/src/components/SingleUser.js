import React from "react"

const SingleUser = ({ user }) =>
{
    if (!user)
    {
        return null
    }

    console.log(user)
    return (
        <div>
            <h1>{user.name}</h1>
            <h3>Added blogs</h3>

            <ul>
                {user.blogs.map((ele) => <li key={ele.id}>{ele.title}</li>)}
            </ul>

        </div >
    )
}

export default SingleUser