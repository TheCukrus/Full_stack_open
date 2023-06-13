import "./Notification.css"

const Notification = ({ notification }) =>
{
    if (notification !== null)
    {
        return <div className={notification.nameOfClass}>
            {notification.message}
        </div>
    }
}

export default Notification