import React, { useEffect, useState } from "react";
import TextField from "../components/textFields";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "e-mail обязательно для заполнения"
            },
            isEmail: {
                message: "email введен не верно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязательно для заполнения"
            },
            isCapitalSymbol: {
                message: "Должна быть заглавная буква"
            },
            isContainDigit: {
                message: "Должна быть цифра"
            },
            min: {
                message: "Должно быть не менее 8 символов",
                value: 8
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const hadnleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        const isValid = validate();
        if (!isValid) { return; };
    };

    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={hadnleSubmit}>
                        <TextField label="E-mail" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                        <TextField label="password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password}/>
                        <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </>;
};

export default Login;
