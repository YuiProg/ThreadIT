import mongoose, {Document, Model} from "mongoose";
import cloudinary from "../helpers/cloudinary.js";

interface ThreadModel {
    name: string;
    description: string;
    image_url: string;
    image_id: string;
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
    const { image_url } = payload;
    
    if (!image_url) {
        return Error('No Image Provided');
    }

    const uploadImage = await cloudinary.uploader.upload(image_url, {
        resource_type: "image",
            transformation: {
                quality: 'auto',
                format: 'png'
            }
    });
    data.image_url = uploadImage.secure_url;
    data.image_id = uploadImage.public_id;
    
    const newThread = await this.create(data);
    return newThread;
}

const Thread = mongoose.model<ThreadInterfaceModel, ThreadStaticInterface>('Thread', ThreadSchema);

export default Thread;