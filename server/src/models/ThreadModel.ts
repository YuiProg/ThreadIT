import mongoose, {Document, Model} from "mongoose";

interface ThreadModel {
    name: string;
    description: string;
    image?: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    members: Array<{
        _id: string;
        username: string;
        userImage: string;
        joinedAt: string;
    }>
}

interface ThreadInterfaceModel extends ThreadModel, Document {}

interface ThreadStaticInterface extends Model<ThreadInterfaceModel> {
    
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
    image: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: {
        type: [Object],
        default: []
    }
});

const Thread = mongoose.model<ThreadInterfaceModel, ThreadStaticInterface>('Thread', ThreadSchema);

export default Thread;