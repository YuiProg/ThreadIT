import toast from "react-hot-toast";
import AuthStore from "../store/authStore";
import axiosInstance from "./axiosInstance";

const { 
    registerUser, 
    loginUser,
    getUser,
    updateUser 
} = AuthStore.getState();

type UserInput = {
    email?: string;
    password?: string;
    username?: string;
    profilePic?: string;
}

class Authenticate {
    private email?: string;
    private password?: string;
    private username?: string;
    private profilePic?: string;

    constructor({email, password, username, profilePic} : UserInput) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.profilePic = profilePic;
    }

    public LoginUser () : void {
        loginUser({
            email: this.email,
            password: this.password
        });
    }

    public RegisterUser () : void {
        registerUser({
            username: this.username,
            email: this.email,
            password: this.password
        });
    }

    public updateUser (_id: string) : void {
        updateUser({
            username: this.username,
            profilePic: this.profilePic,
        }, _id);
    }

    async Logout () : Promise<void> {
        const res = await axiosInstance.post('/logout');
        toast.success(res.data.message);
        getUser();
    }
}

export default Authenticate;