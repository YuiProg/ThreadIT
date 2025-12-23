import mongoose, {Document, Model, Types} from "mongoose";
import bcrypt from "bcryptjs";
import cloudinary from "../helpers/cloudinary.js";

type UserType = {
    username: string;
    email: string;
    password: string;
    profilePic?: string;
    picId?: string;
}

interface UserModel extends UserType, Document {
    _id: Types.ObjectId; //para hindi 'unknown' ang i return para sa token
}

interface UserModelStatics extends Model<UserModel> {
    login(email: string, password: string): Promise<UserModel>;
    getUsers(): Promise<UserModel[]>;
    updateUser(username: string, profilePic: string, id: string) : Promise<UserModel>;
}

const UserSchema = new mongoose.Schema<UserModel>({
    username: {
        type: String,
        required: [true, 'Username is required.']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.']
    },
    profilePic: {
        type: String
    },
    picId: {
        type: String
    }
}, { timestamps: true});


UserSchema.pre('save', async function(next: mongoose.CallbackWithoutResultAndOptionalError) : Promise<void> {
    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function (email: string, password: string) : Promise<UserModel | Error> {

    const user = await this.findOne({email});
    if (user) {
        const auth: boolean = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error ('Invalid password');
    }
    throw Error ('No user found');
};

UserSchema.statics.getUsers = async function () : Promise<UserModel[]> {
    const users = await this.find({}).select('-password');
    return users;
}

UserSchema.statics.updateUser = async function 
    (
        _id: string,
        username: string, 
        profilePic: string, 
    ) 
    : Promise<Partial<UserModel> | Error> {
    
    if (username.trim() === "" && !profilePic) throw Error("Failed to update");

    if (!mongoose.Types.ObjectId.isValid(_id)) throw Error("INVALID ID");

    const updatedData: Partial<UserModel> = {username};
    
    if (profilePic) {
        const picture = await cloudinary.uploader.upload(profilePic, {
            resource_type: "image"
        });
        updatedData.profilePic = picture.secure_url;
        updatedData.picId = picture.public_id;
    }
    
    
    const newUser = await this.findByIdAndUpdate(_id, updatedData, {new: true}).select("-password");
    
    return newUser;
}

const User = mongoose.model<UserModel, UserModelStatics>('User', UserSchema);

export default User;