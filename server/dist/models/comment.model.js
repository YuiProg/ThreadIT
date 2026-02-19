import mongoose, { Document, Model } from "mongoose";
const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post"
    },
    comment: {
        type: String,
        required: [true, 'comment required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    username: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    }
}, { timestamps: true });
//pass the post id here to update the post commentcount
CommentSchema.statics.newComment = async function (comment) {
    try {
        const newComment = await this.create(comment);
        return newComment;
    }
    catch (error) {
        throw error;
    }
};
CommentSchema.statics.getComments = async function (id) {
    const res = await this.find({ postId: id }).sort({ createdAt: -1 }).limit(5);
    return res;
};
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
//# sourceMappingURL=comment.model.js.map