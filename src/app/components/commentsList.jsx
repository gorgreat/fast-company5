import React, { useState } from "react";
import PropTypes from "prop-types";
import API from "../api";

const CommentsList = () => {
    const [comments, setComments] = useState(API.comments.fetchAll());

    console.log(comments);

    return <>

    </>;
};

CommentsList.propTypes = {
    id: PropTypes.string
};

export default CommentsList;
