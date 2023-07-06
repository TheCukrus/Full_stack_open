import React, { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "./UserContext.js"
import { Navbar, Nav, Button } from "react-bootstrap"
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" as="span">
                        <Link to="/users">Users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/">Blogs</Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <span className="navbar">
                {user.username} logged in
                <Button
                    id="logout-button"
                    type="submit"
                    value="Logout"
                    variant="secondary"
                    onClick={handleLogout}
                >Logout</Button>
            </span>
        </Navbar>
    )
}

export default Navigation