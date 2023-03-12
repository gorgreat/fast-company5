import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, type, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return <>
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea className={getInputClasses()} id={name} value={value} onChange={handleChange} name={name} />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    </>;
};

TextAreaField.defaultProps = {
    type: "text"
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default TextAreaField;
