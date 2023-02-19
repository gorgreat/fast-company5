import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textFields";
import { validator } from "../../../utils/validator";
import { validatorConfig } from "../../../utils/validatorConfig";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import API from "../../../api";
import { useHistory, useParams } from "react-router-dom";

const UserEditPage = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    const [data, setData] = useState({});

    useEffect(() => {
        API.users.getById(userId).then((data) =>
        setData(data));
    }, []);

    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);

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

    const handleChange = (target) => {
         setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
    };

    const getProfessionById = (name) => {
        for (const prof of professions) {
            if (prof.label === name) {
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
        history.push(`/users/${userId}`);
    };

    const hadnleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        const dataUpdate = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };

        API.users.update(userId, dataUpdate).then((data) => {
            handleBack();
        });
    };

    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {data
                        ? <>
                            <form onSubmit={hadnleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="E-mail"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберем профессию"
                                    onChange={handleChange}
                                    options={professions}
                                    defaultOption="Необходимо выбрать"
                                    error={errors.profession}
                                    value={data.profession}
                                    name="profession"
                                />
                                <RadioField
                                    options={[{ name: "Муж", value: "male" }, { name: "Жен", value: "female" }]}
                                    name={"sex"}
                                    onChange={handleChange}
                                    value={data.sex}
                                    label="Ваш пол"
                                />
                                <MultiSelectField
                                    label="Ваши качества"
                                    options={qualities}
                                    onChange={handleChange}
                                    name="qualities"
                                    defaultValue={data.qualities}
                                />
                                <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Обновить</button>
                            </form>
                        </>
                        : "Загрузка"
                    }
                </div>
            </div>
        </div>
    </>;
};

export default UserEditPage;
