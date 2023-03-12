import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import API from "../../api";
import { useParams } from "react-router-dom";
import CommentsList from "../common/comment/commentsList";
import AddCommentForm from "../common/comment/addCommentForm";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleRemoveComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((item) => item._id !== id));
        });
    };

    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then(() => setComments([...comments, data]));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return <>
        <div className="card mb-2">
            <AddCommentForm onSubmit={handleSubmit} />
        </div>

        {sortedComments.length > 0 &&
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList
                        comments={sortedComments}
                        onRemove={handleRemoveComment}
                    />
                </div>
            </div>
        }
    </>;
};

export default Comments;
