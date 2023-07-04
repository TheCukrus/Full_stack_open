import "./Notification.css"
import { useContext } from "react"
import NotificationContex from "../components/NotificationContext.js"

const Notification = () =>
{
    const [notification, notificationDispatch] = useContext(NotificationContex)

    if (notification)
    {
        setTimeout(() => notificationDispatch({ type: "REMOVE", payload: null }), 5000)
    }

    if (!notification) return null

    console.log(notification)
    return (
        <div className={notification.nameOfClass}>
            {notification.message}
        </div>
    )
}

export default Notification