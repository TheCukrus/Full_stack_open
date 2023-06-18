import "./Notification.css"

const Notification = ({ notification }) =>
{
    if (notification !== null)
    {
        return (
            <div className={notification.nameOfClass}>
                {notification.message}
            </div>
        )
    }
    return null
}

export default Notification