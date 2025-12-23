import mongoose, { Document, Model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import cloudinary from "../helpers/cloudinary.js";
const UserSchema = new mongoose.Schema({
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
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Invalid password');
    }
    throw Error('No user found');
};
UserSchema.statics.getUsers = async function () {
    const users = await this.find({}).select('-password');
    return users;
};
UserSchema.statics.updateUser = async function (_id, username, profilePic) {
    if (username.trim() === "" && !profilePic)
        throw Error("Failed to update");
    if (!mongoose.Types.ObjectId.isValid(_id))
        throw Error("INVALID ID");
    const updatedData = { username };
    if (profilePic) {
        const picture = await cloudinary.uploader.upload(profilePic, {
            resource_type: "image"
        });
        updatedData.profilePic = picture.secure_url;
        updatedData.picId = picture.public_id;
    }
    const newUser = await this.findByIdAndUpdate(_id, updatedData, { new: true }).select("-password");
    return newUser;
};
const User = mongoose.model('User', UserSchema);
export default User;
//# sourceMappingURL=UserModel.js.map