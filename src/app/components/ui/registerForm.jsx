import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
import { validator } from "../../utils/validator";
import { validatorConfig } from "../../utils/validatorConfig";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState(
        {
            email: "",
            password: "",
            profession: "",
            sex: "male",
            qualities: [],
            licence: false
        }
    );
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);

    const handleChange = (target) => {
         setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const hadnleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    return <>
        <form onSubmit={hadnleSubmit}>
            <TextField
                label="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="???????? ??????????????????"
                onChange={handleChange}
                options={professions}
                defaultOption="???????????????????? ??????????????"
                error={errors.profession}
                value={data.profession}
                name="profession"
            />
            <RadioField
                options={[{ name: "??????", value: "male" }, { name: "??????", value: "female" }]}
                name={"sex"}
                onChange={handleChange}
                value={data.sex}
                label="?????? ??????"
            />

            <MultiSelectField
                label="???????? ????????????????"
                options={qualities}
                onChange={handleChange}
                name="qualities"
                defaultValue={data.qualities}
            />

            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>??????????????????</button>

            <CheckBoxField name="licence" value={data.licence} onChange={handleChange} error={errors.licence}>
                ?????????????????????? <a>???????????????????????? ????????????????????</a>
            </CheckBoxField>

        </form>
    </>;
};

export default RegisterForm;
