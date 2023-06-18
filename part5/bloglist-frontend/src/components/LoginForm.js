import Notification from "./Notification.js"
import PropTypes from "prop-types"

const LoginForm = ({ notification, handleOnClick, username, password, usernameOnChange, passwordOnChange }) =>
{
    return (
        <div>
            <h1>Log in to application</h1>

            <Notification notification={notification} />

            <form onSubmit={handleOnClick} name="login form">
                Username<input type="text" value={username} onChange={usernameOnChange} /><br />
                Password<input type="password" value={password} onChange={passwordOnChange} /><br />
                <input type="submit" />
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