import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () =>
{
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notification, notificationDispatch] = useContext(NotificationContext)

  if (notification)
  {
    setTimeout(() => notificationDispatch({ type: "REMOVE", payload: null }), 5000)
  }

  if (!notification) return null

  console.log(notification)
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
