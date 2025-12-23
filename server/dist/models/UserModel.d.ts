import { Document, Model, Types } from "mongoose";
type UserType = {
    username: string;
    email: string;
    password: string;
    profilePic?: string;
    picId?: string;
};
interface UserModel extends UserType, Document {
    _id: Types.ObjectId;
}
interface UserModelStatics extends Model<UserModel> {
    login(email: string, password: string): Promise<UserModel>;
    getUsers(): Promise<UserModel[]>;
    updateUser(username: string, profilePic: string, id: string): Promise<UserModel>;
}
declare const User: UserModelStatics;
export default User;
//# sourceMappingURL=UserModel.d.ts.map