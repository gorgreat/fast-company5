import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import Users from "../components/users";

const UsersLayot = () => {
    const params = useParams();
    const { userId } = params;
    return <>
        {userId ? <UserPage id={userId} /> : <Users />}
    </>;
};

export default UsersLayot;
