import React, { useEffect, useState } from "react";
import TextField from "../common/form/textFields";
import { validator } from "../../utils/validator";
import { validatorConfig } from "../../utils/validatorConfig";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import API from "../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserEditForm = ({ data, professions, qualities }) => {
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: data.name,
        email: data.email,
        sex: data.sex,
        profession: data.profession._id,
        qualities: data.qualities.map((item) => {
            return { label: item.name, value: item._id };
        })
    });
    const getFrof = () => {
        if (professions) {
            const professionsList = Object.keys(professions).map((professionName) => ({
                label: professions[professionName].name,
                value: professions[professionName]._id
            }));
            return professionsList;
        }
    };

    const getQual = () => {
        const qualitiesList = Object.keys(qualities).map((optionName) => ({
            label: qualities[optionName].name,
            value: qualities[optionName]._id,
            color: qualities[optionName].color
        }));
        return qualitiesList;
    };

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (name) => {
        for (const key in professions) {
            if (professions[key].name === name) {
               return professions[key];
            };
        };
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const key in qualities) {
                if (elem.value === qualities[key]._id) {
                    qualitiesArray.push({
                        _id: qualities[key]._id,
                        name: qualities[key].name,
                        color: qualities[key].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const handleBack = () => {
        history.push(`/users/${data._id}`);
    };

    const hadnleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = userData;
        const dataUpdate = {
            ...userData,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        API.users.update(data._id, dataUpdate).then((data) => {
            console.log("обновил данные", dataUpdate);
            handleBack();
        });
    };

    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={hadnleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="E-mail"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выберем профессию"
                            onChange={handleChange}
                            options={getFrof()}
                            defaultOption="Необходимо выбрать"
                            error={errors.profession}
                            name="profession"
                            value={userData.profession}
                        />

                        <RadioField
                            options={[{ name: "Муж", value: "male" }, { name: "Жен", value: "female" }]}
                            name={"sex"}
                            onChange={handleChange}
                            value={userData.sex}
                            label="Ваш пол"
                        />
                        <MultiSelectField
                            label="Ваши качества"
                            options={getQual()}
                            onChange={handleChange}
                            name="qualities"
                            defaultValue={userData.qualities}
                        />
                        <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Обновить</button>
                    </form>
                </div>
            </div>
        </div>
    </>;
};

UserEditForm.propTypes = {
    data: PropTypes.object,
    professions: PropTypes.object,
    qualities: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UserEditForm;
