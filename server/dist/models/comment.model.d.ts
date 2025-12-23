import mongoose, { Document, Model } from "mongoose";
type CommentType = {
    postId: mongoose.Schema.Types.ObjectId;
    comment: string;
    userId: mongoose.Schema.Types.ObjectId;
    profilePic: string;
    username: string;
};
interface CommentInterface extends CommentType, Document {
}
interface CommentInterfaceStatics extends Model<CommentInterface> {
    newComment(comment: CommentType): Promise<CommentInterface | Error>;
    getComments(id: string): Promise<CommentInterface[]>;
}
declare const Comment: CommentInterfaceStatics;
export default Comment;
//# sourceMappingURL=comment.model.d.ts.map