import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return <>
        <div className="mb-4">
            <div>
                <label>{label} </label>
            </div>
            {options.map(item =>
                <div className="form-check form-check-inline" key={item.name + "_" + item.value}>
                    <input className="form-check-input" type="radio" name={name} id={item.name + "_" + item.value} value={item.value} checked={item.value === value} onChange={handleChange} />
                    <label className="form-check-label" htmlFor={item.name + "_" + item.value}>{item.name}</label>
                </div>
                )
            }
        </div>
    </>;
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
};

export default RadioField;
