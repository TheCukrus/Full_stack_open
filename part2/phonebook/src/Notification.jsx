import React from "react";
import "./notification.css";

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
    return null;
}

export default Notification;