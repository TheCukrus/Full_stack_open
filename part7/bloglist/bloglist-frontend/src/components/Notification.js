import "./Notification.css"
import { useContext } from "react"
import NotificationContex from "../components/NotificationContext.js"
import { Alert } from "react-bootstrap"
const Notification = () =>
{
    const [notification, notificationDispatch] = useContext(NotificationContex)

    if (notification)
    {
        setTimeout(() => notificationDispatch({ type: "REMOVE", payload: null }), 5000)
    }

    if (!notification) return null

    // console.log(notification)
    return (
        <Alert variant={notification.nameOfClass === "error" ? "danger" : "success"}>
            {notification.message}
        </Alert>
    )
}

export default Notification