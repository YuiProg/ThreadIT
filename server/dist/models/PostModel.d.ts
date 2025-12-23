import mongoose, { Document, Model } from "mongoose";
type LikeObjectType = {
    _id: string;
    username: string;
    profilePic: string;
};
type PostType = {
    userId: mongoose.Schema.Types.ObjectId;
    username: string;
    userImage: string;
    title: string;
    description: string;
    genre: string;
    upvote?: LikeObjectType[];
    downvote?: LikeObjectType[];
    commentCount?: number;
    image: string;
    imageId?: string;
    video: string | undefined;
    videoId?: string | undefined;
};
interface PostInterface extends PostType, Document {
}
interface PostStaticInterface extends Model<PostInterface> {
    createImagePost(data: PostType): Promise<PostInterface>;
    getPosts(): Promise<PostInterface[]>;
    createVideoPost(data: PostType): Promise<Partial<PostType>>;
    getSinglePost(_id: string): Promise<PostInterface>;
}
declare const Post: PostStaticInterface;
export default Post;
//# sourceMappingURL=PostModel.d.ts.map