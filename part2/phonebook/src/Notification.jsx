import React from "react";

const Notification = ({ message, nameOfClass }) => 
{
    return (
        <div className={nameOfClass}>
            <p>{message}</p>
        </div>
    )
}

export default Notification;