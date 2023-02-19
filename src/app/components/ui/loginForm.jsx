import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
// import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
// import { validatorConfig } from "../../utils/validatorConfig";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});

    const validateScheme = yup.object().shape({
        password: yup.string()
            .required("пароль обзятельно")
            .matches(/^(?=.*[A-Z])/, "должна быть заглавная")
            .matches(/(?=.*[0-9])/, "должно быть число")
            .matches(/(?=.*[!@#$%^&*])/, "должен быть спецсимвол !@#$%^&*")
            .matches(/(?=.{8})/, "должен быть не менее 8 символов"),
        email: yup.string().required("email обзятельно").email("email введен неверно")
      });

    const handleChange = (target) => {
        setData((prevState) => ({
               ...prevState,
               [target.name]: target.value
           }));
   };

   useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
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
        <form onSubmit={hadnleSubmit}>
            <TextField label="E-mail" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label="password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password}/>
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Отправить</button>
            <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
                Запомнить меня
            </CheckBoxField>
        </form>
    </>;
};

export default LoginForm;
