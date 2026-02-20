import mongoose, { Document, Model } from "mongoose";
type LikeObjectType = {
    _id: mongoose.Schema.Types.ObjectId;
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
    private: boolean;
};
interface PostInterface extends PostType, Document {
}
interface PostStaticInterface extends Model<PostInterface> {
    createImagePost(data: PostType): Promise<PostInterface>;
    getPosts(): Promise<PostInterface[]>;
    createVideoPost(data: PostType): Promise<Partial<PostType>>;
    getSinglePost(_id: string): Promise<PostInterface>;
    likePost(postId: string, data: {
        userId: string;
        username: string;
        userImage: string;
    }): Promise<PostInterface>;
    unlikePost(postId: string, data: {
        userId: string;
        username: string;
        userImage: string;
    }): Promise<PostInterface>;
    downvotePost(postId: string, data: {
        userId: string;
        username: string;
        userImage: string;
    }): Promise<PostInterface>;
    undownvotePost(postId: string, data: {
        userId: string;
        username: string;
        userImage: string;
    }): Promise<PostInterface>;
}
declare const Post: PostStaticInterface;
export default Post;
//# sourceMappingURL=PostModel.d.ts.map