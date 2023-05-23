import React from "react";

const Persons = ({ shownContacts, handleDelete }) =>
{
    return (
        <div>
            {shownContacts.map((ele) =>
                <div key={ele.id}>
                    <span>{ele.name} {ele.number}</span>
                    <input type="submit" value="delete" onClick={() => handleDelete(ele.id, ele.name)} />
                </div>
            )}
        </div>
    )
}

export default Persons;