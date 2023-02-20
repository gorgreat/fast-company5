import React, { useEffect, useState } from "react";
import API from "../../../api";
import { useParams } from "react-router-dom";
import UserEditForm from "../../ui/userEditForm";

const UserEditPage = () => {
    const { userId } = useParams();
    const [data, setData] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        API.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
        API.users.getById(userId).then((data) => setData(data));
    }, []);

    return <>
        { (data && professions)
            ? <UserEditForm data={data} professions={professions} qualities={qualities}/>
            : "Загрузка..."
        }
    </>;
};

export default UserEditPage;
