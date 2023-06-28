import { useDispatch, useSelector } from "react-redux"

const Notification = () =>
{
  const notification = useSelector((state) => state.notification.message)

  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification)
  {
    console.log(notification)
    setTimeout(() => dispatch({ type: "notification/setRemoveMessage", payload: null }), 5000)
  }

  return (
    <div style={notification ? style : null}>
      {notification}
    </div>
  )
}

export default Notification