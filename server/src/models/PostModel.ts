import mongoose, { Document, Model } from "mongoose"
import cloudinary from "../helpers/cloudinary.js";

type LikeObjectType = {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    profilePic: string;
}

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
}

interface PostInterface extends PostType, Document {}

interface PostStaticInterface extends Model<PostInterface> {
    createImagePost(data: PostType) : Promise<PostInterface>;
    getPosts() : Promise<PostInterface[]>;
    createVideoPost(data: PostType): Promise<Partial<PostType>>;
    getSinglePost(_id: string) : Promise<PostInterface>;
    likePost(postId: string, data: {userId: string, username: string, userImage: string}) : Promise<PostInterface>;
    unlikePost(postId: string, data: {userId: string, username: string, userImage: string}) : Promise<PostInterface>;
    downvotePost(postId: string, data: {userId: string, username: string, userImage: string}) : Promise<PostInterface>;
    undownvotePost(postId: string, data: {userId: string, username: string, userImage: string}) : Promise<PostInterface>;
}

const PostSchema = new mongoose.Schema<PostInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title for post']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for post']
    },
    genre: {
        type: String,
        required: [true, 'Please select a genre']
    },
    upvote: {
        type: [Object],
        default: []
    },
    downvote: {
        type: [Object],
        default: []
    },
    private: {
        type: Boolean,
        required: true
    },
    commentCount: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    imageId: {
        type: String,
    },
    video: {
        type: String,
    },
    videoId: {
        type: String,
    }
}, { timestamps: true });

PostSchema.statics.createTextPost = async function (data: PostType) : Promise<PostInterface | Error> {
    try {
        const { userId, username, genre, title, description } = data;

        const newPost = await this.create(data);
        return newPost;
    } catch (error) {
        throw error;
    }
}

PostSchema.statics.createImagePost = async function (data: PostType) : Promise<PostInterface | Error> {
    try {
        const { userId, image, username, genre, title, description } = data;

        if (!mongoose.Types.ObjectId.isValid(String(userId))) throw Error('Invalid ID');
        
        const updateData: Partial<PostInterface> = data;

        if (image) {
            const newImage = await cloudinary.uploader.upload(image, {
                resource_type: "image",
                transformation: {
                    quality: 'auto',
                    format: 'png'
                }
            });
            updateData.image = newImage.secure_url;
            updateData.imageId = newImage.public_id;
        }

        const newPost = await this.create(updateData);

        return newPost;

    } catch (error) {
        throw error;
    }
}

PostSchema.statics.createVideoPost = async function (data: PostType) : Promise<Partial<PostInterface> | Error> {
    try {
        const { video } = data;

        const newData : Partial<PostInterface> = data;
        if (video) {
            
            const newVideo = await cloudinary.uploader.upload_large(video, {
                resource_type: "video"
            }, (error, result) => {
                if (error) throw Error('Failed to upload');
                newData.video = result?.secure_url;
                newData.videoId = result?.public_id;
            });
        }
        
        const newPost = await this.create(newData);
        
        return newPost;
    } catch (error) {
        throw error;
    }
}

PostSchema.statics.getSinglePost = async function (_id: string) : Promise<PostInterface> {
    const post = await this.findOne({_id});
    return post;
}


PostSchema.statics.getPosts = async function () : Promise<PostInterface[]> {
    const POSTS = await this.find({private: false}).limit(7).sort({createdAt: -1});
    return POSTS;
}

//UPVOTE AND DOWNVOTE LOGIC

PostSchema.statics.likePost = async function (_id: string, data: { userId: string, username: string, userImage: string }) : Promise<PostInterface> {
    const POST = await this.findByIdAndUpdate({_id}, {
        $addToSet: {
            upvote: {
                _id: data.userId,
                username: data.username,
                profilePic: data.userImage
            }
        }
    }, { new: true });

    return POST;
}

PostSchema.statics.unlikePost = async function (_id: string, data: { userId: string, username: string, userImage: string }) : Promise<PostInterface> {
    const POST = await this.findByIdAndUpdate({_id}, {
        $pull: {
            upvote: {
                _id: data.userId,
            }
        }
    }, { new: true });

    return POST;
}

PostSchema.statics.downvotePost = async function (_id: string, data: { userId: string, username: string, userImage: string }) : Promise<PostInterface> {
    const POST = await this.findByIdAndUpdate({_id}, {
        $addToSet: {
            downvote: {
                _id: data.userId,
                username: data.username,
                profilePic: data.userImage
            }
        }
    }, { new: true });

    return POST;
}

PostSchema.statics.undownvotePost = async function (_id: string, data: { userId: string, username: string, userImage: string }) : Promise<PostInterface> {
    const POST = await this.findByIdAndUpdate({_id}, {
        $pull: {
            downvote: {
                _id: data.userId,
            }
        }
    }, { new: true });

    return POST;
}



const Post = mongoose.model<PostInterface, PostStaticInterface>('Post', PostSchema);

export default Post;