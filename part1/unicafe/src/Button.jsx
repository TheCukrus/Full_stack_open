import React from "react";

const Button = (props) =>
{
    const { val, func } = props;

    return (
        <>
            <input type="button" value={val} onClick={func} />
        </>
    )
}

export default Button;