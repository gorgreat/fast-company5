import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const getInputCalsses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const toogleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return <>
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input className={getInputCalsses()} type={showPassword === true ? "type" : type} id={name} value={value} onChange={onChange} name={name} />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toogleShowPassword}>
                        <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    </>;
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default TextField;
