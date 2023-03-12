import React, { useEffect, useState } from "react";
import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) =>
        setUser(data));
    }, []);

    return <>
        {user
            ? <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard data={user.completedMeetings} />
                    </div>

                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
            : "Загрузка..."
        }
    </>;
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
