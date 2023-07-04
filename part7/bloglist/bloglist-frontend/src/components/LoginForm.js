import Notification from "./Notification.js"
import PropTypes from "prop-types"

const LoginForm = ({ handleOnClick, username, password, usernameOnChange, passwordOnChange }) =>
{
    return (
        <div>
            <h1>Log in to application</h1>

            <Notification />

            <form onSubmit={handleOnClick} name="login form">
                Username<input id="username" type="text" value={username} onChange={usernameOnChange} /><br />
                Password<input id="password" type="password" value={password} onChange={passwordOnChange} /><br />
                <input id="login-button" type="submit" />
            </form>
        </div>
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