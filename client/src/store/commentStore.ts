import { isAxiosError } from 'axios';
import {create} from 'zustand'
import axiosInstance from '../helpers/axiosInstance';

type CommentType = {
    _id: string;
    userId: string;
    username: string;
    profilePic: string;
    postId: string;
    comment: string;
    createdAt: string;
}

type CommentStoreType = {
    comments: CommentType[];
    loadingComments: boolean;
    getComments: (data: Pick<CommentType, 'postId'>) => Promise<void>;
}

const CommentStore = create<CommentStoreType>((set) => ({
    comments: [],
    loadingComments: false,

    getComments: async (id: Pick<CommentType, 'postId'>) : Promise<void> => {
        try {
            const {postId} = id;
            const res = await axiosInstance.get<CommentType[]>(`/getComments/${postId}`);
            set({comments: res.data});
        } catch (error : any) {
            error as {message: string};
            if (isAxiosError(error)) {
                console.log(error.message);
                set({comments: []});
            }
        }
    }
}));

export default CommentStore;