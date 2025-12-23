import Comment from "../models/comment.model.js";
export const newComment = async (req, res) => {
    try {
        const { username, profilePic, _id } = req.user;
        const userId = _id;
        const { postId, comment } = req.body;
        const newComment = await Comment.newComment({ username, profilePic, userId, postId, comment });
        res.status(201).json(newComment);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.getComments(String(id));
        res.status(200).json(comments);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
//# sourceMappingURL=commentController.js.map