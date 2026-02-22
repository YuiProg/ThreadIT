import {create} from 'zustand'
import axiosInstance from '../helpers/axiosInstance.ts';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';


type UserType = {
    username: string;
    email: string;
    profilePic?: string;
    picId?: string;
    _id: string;
}

type AuthType = {
    loadingUser: boolean;
    authenticating: boolean;
    AuthUser: UserType | null; 
    view: boolean;
    setView: () => void;
    getUser: () => Promise<void>;
    registerUser: (userData: UserInputType) => Promise<void>;
    loginUser: (userData: Pick<UserInputType, 'email' | 'password'>) => Promise<void>;
    updateUser: (userData: Pick<UserInputType, 'username' | 'profilePic'>, _id: string) => Promise<void>;
}

type UserInputType = {
    username?: string;
    profilePic?: string;
    email?: string;
    password?: string;
}   

const AuthStore = create<AuthType>((set, get) =>({
    AuthUser: null,
    loadingUser: false,
    authenticating: false,
    view: false,

    setView: () => set({view: get().view ? false : true}),

    getUser: async () : Promise<void> => {
        set({loadingUser: true});
        try {
            const user = await axiosInstance.get('/checkUser');
            set({AuthUser: user.data});
            
        } catch (error : unknown) {
            if (isAxiosError(error)) {
                console.log(error.response?.data);
                set({AuthUser: null});
            }
        } finally {
            set({loadingUser: false});
        }
    },

    loginUser: async (userData) : Promise<void> => {
        try {
            set({authenticating: true});
            const { email, password } = userData;
            const res = await axiosInstance.post('/login', {
                email,
                password
            });
            toast.success(res.data.message);
            set({AuthUser: res.data});
        } catch (error : unknown) {
            isAxiosError(error) ? console.log(error.response?.data) : console.log(error);
        } finally {
            set({authenticating: false});
            get().getUser();
        }
    },

    updateUser: async (userData, _id: string) : Promise<void> => {
        try {
            set({authenticating: true});
            const {username, profilePic} = userData;
            console.log(profilePic);
            const updated = await axiosInstance.put(`/updateUser/${_id}`, {
               username,
               profilePic 
            });
            set({AuthUser: updated.data});
        } catch (error : unknown) {
            isAxiosError(error) ? console.log(error.response?.data) : console.log(error);
        } finally {
            set({authenticating: false});
        }
    },


    registerUser: async (userData) : Promise<void> => {
        try {
            set({authenticating: true});
            const { username, email, password } = userData;
            console.log(username, email, password);
            const res = await axiosInstance.post('/register', {
                username,
                email,
                password
            });

            toast.success(`${res.data.username} registered!`);
        
        } catch (error : unknown) {
            isAxiosError(error) ? console.log(error.response?.data) : console.log(error);
        } finally {
            set({authenticating: false});
            get().getUser();
        }
    }
}));

export default AuthStore;