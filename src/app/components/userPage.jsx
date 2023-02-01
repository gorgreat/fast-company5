import React, { useEffect, useState } from "react";
import API from "../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        API.users.getById(id).then((data) =>
        setUserInfo(data));
    }, []);

    const handleBack = () => {
        history.push("/users");
    };
    return <>
        {userInfo
            ? <div>
                <h1>{userInfo.name}</h1>
                <p>Количество встреч: {userInfo.completedMeetings}</p>
                <p>Профессия: {userInfo.profession.name}</p>
                <p>Рейтинг: {userInfo.rate}</p>
                <p>Качества: {userInfo.qualities.map((item) => (<span key={item._id} className={"badge m-1 bg-" + item.color}>{item.name}</span>)) }</p>
            </div>
            : "Loading..."
        }
        <button className="btn btn-secondary" onClick={() => handleBack()}>К списку пользователей</button>
    </>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
