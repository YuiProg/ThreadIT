import mongoose, {Document, Model} from "mongoose";
import cloudinary from "../helpers/cloudinary.js";

interface ThreadModel {
    name: string;
    description: string;
    image_url: string;
    image_id: string;
    icon_url: string;
    icon_id: string;
    userIconUrl: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    members: Array<{
        _id: string;
        username: string;
        userImage: string;
        joinedAt: string;
    }>
    maxLength: Number;
}

interface ThreadInterfaceModel extends ThreadModel, Document {}

interface ThreadStaticInterface extends Model<ThreadInterfaceModel> {
    createThread: (payload: ThreadModel) => Promise<ThreadModel>;
    getThreads: () => Promise<ThreadModel[]>;
}

const ThreadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Thread name is required.'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Thread description is required.']
    },
    image_url: {
        type: String,
        required: true
    },
    image_id: {
        type: String,
        required: true
    },
    icon_url: {
        type: String,
        required: true
    },
    icon_id: {
        type: String,
        required: true
    },
    userIconUrl: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: {
        type: [Object],
        default: []
    },
    maxLength: {
        type: Number,
        required: [true, 'Max length is required!']
    }
});


ThreadSchema.statics.createThread = async function (payload : ThreadModel) : Promise<ThreadModel | Error> {
    const data : Partial<ThreadModel> = payload;
    const { image_url, icon_url } = payload;
    
    if (!image_url) {
        return Error('No Image Provided');
    }
    const uploadIconImage = await cloudinary.uploader.upload(icon_url, {
        resource_type: "image",
            transformation: {
                quality: 'auto',
                format: 'png'
            }
    });

    const uploadBgImage = await cloudinary.uploader.upload(image_url, {
        resource_type: "image",
            transformation: {
                quality: 'auto',
                format: 'png'
            }
    });
    data.image_url = uploadBgImage.secure_url;
    data.image_id = uploadBgImage.public_id;
    data.icon_url = uploadIconImage.secure_url;
    data.icon_id = uploadIconImage.public_id;
    
    const newThread = await this.create(data);
    return newThread;
}

ThreadSchema.statics.getThreads = async function () : Promise<ThreadModel[]> {
    const response = await this.find({}).limit(7);
    return response;
}

const Thread = mongoose.model<ThreadInterfaceModel, ThreadStaticInterface>('Thread', ThreadSchema);

export default Thread;