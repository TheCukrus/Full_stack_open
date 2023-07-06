import Notification from "./Notification.js"
import PropTypes from "prop-types"
import { Form, Button } from "react-bootstrap"

const LoginForm = ({ handleOnClick, username, password, usernameOnChange, passwordOnChange }) =>
{
    return (
        <div>
            <h1>Log in to application</h1>

            <Notification />

            <Form onSubmit={handleOnClick} name="login form">
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        value={username}
                        onChange={usernameOnChange}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        value={password}
                        onChange={passwordOnChange}
                    />
                    <Button variant="primary" type="submit" id="login-button">
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </div >
    )
}

LoginForm.propTypes = {
    handleOnClick: PropTypes.func.isRequired,
    usernameOnChange: PropTypes.func.isRequired,
    passwordOnChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm