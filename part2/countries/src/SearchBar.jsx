import React from "react";

const SearchBar = ({ search, handleOnChange }) =>
{
    return (
        <div>
            <span>find countries</span>
            <input type="search" value={search} onChange={handleOnChange} />
        </div>
    )
}

export default SearchBar;