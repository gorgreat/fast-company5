import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ onSearch, value }) => {
    return <>
        <div className="input-group mt-2 mb-2">
            <input type="search" className="form-control" onChange={onSearch} value={value} placeholder="Поиск..."/>
        </div>
    </>;
};

SearchInput.propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func
};

export default SearchInput;
