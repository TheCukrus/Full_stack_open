import React from "react";

const Filter = ({handleSearch}) =>
{
    return (
        <div>
            <p>filer shown with <input type="search" onChange={handleSearch} /></p>
        </div>
    )
}

export default Filter;