import React from "react";

const PersonForm = ({ handleSubmit, handleNameOnChange, handleNumberOnChange, newName, newNumber }) =>
{
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input type="text" onChange={handleNameOnChange} value={newName} />
            </div>
            <div>
                number: <input type="text" onChange={handleNumberOnChange} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;