import React from "react";

const Persons = ({ shownContacts }) =>
{
    return (
        <div>
            {shownContacts.map((ele) => <p key={ele.id}>{ele.name} {ele.number}</p>)}
        </div>
    )
}

export default Persons;