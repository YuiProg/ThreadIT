import mongoose, { Document, Model } from "mongoose";

type CommentType = {
    postId: mongoose.Schema.Types.ObjectId;
    comment: string;
    userId: mongoose.Schema.Types.ObjectId;
    profilePic: string;
    username: string;
}

interface CommentInterface extends CommentType, Document {}

interface CommentInterfaceStatics extends Model<CommentInterface> {
    newComment(comment: CommentType) : Promise<CommentInterface | Error>;
    getComments(id: string) : Promise<CommentInterface[]>;
}

const CommentSchema = new mongoose.Schema<CommentInterface>({
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
}, {timestamps: true});


//pass the post id here to update the post commentcount
CommentSchema.statics.newComment = async function (comment: CommentType) : Promise<CommentInterface | Error> {
    try {
        const newComment = await this.create(comment);
        return newComment;
    } catch (error) {
        throw error;
    }
}   

CommentSchema.statics.getComments = async function (id: string) : Promise<CommentInterface[]> { //paginate this shit
        const res = await this.find({postId: id}).sort({createdAt: -1}).limit(5);
        return res;
}


const Comment = mongoose.model<CommentInterface, CommentInterfaceStatics>("Comment", CommentSchema);

export default Comment;