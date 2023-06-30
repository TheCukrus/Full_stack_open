import React from "react";

const Notification = ({ notification, setNotification }) =>
{

    if (notification)
    {
        setTimeout(() => setNotification(""), 5000)
    }

    return (
        <div>
            {notification}
        </div>
    )
}

export default Notification