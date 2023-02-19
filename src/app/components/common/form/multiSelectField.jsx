import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    const optionsArray = !Array.isArray(options) && typeof options === "object"
    ? Object.values(options)
    : options;

    return <>
        <div className="mb-4">
            <label className="form-label">{label}</label>
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={optionsArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    defaultValue={defaultValue}
                    name={name}
                />
        </div>
    </>;
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
