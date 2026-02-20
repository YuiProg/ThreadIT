import {create} from 'zustand'
import axiosInstance from '../helpers/axiosInstance';

type LikeObjectType = {
    _id: string;
    username: string;
    profilePic: string;
}

type PostType = {
    title: string;
    description: string;
    genre: string;
    username: string;
    upvote?: LikeObjectType[];
    downvote?: LikeObjectType[];
    commentCount?: number;
    image?: string;
    imageId?: string;
    video?: string;
    videoId?: string;
}

type CreatePostType = {
    posts: PostType[];
    state: boolean;
    view: string;
    setView: (state: string) => void;
    getPosts: () => Promise<void>;
    setState: (state: boolean) => void;
}

const PostStore = create<CreatePostType>((set) => ({
    posts: [],
    state: JSON.parse(localStorage.getItem('postState') || 'false'),
    view: 'post',

    setView: (state: string) => {
        set({view: state});
    },

    setState: (state: boolean) => {
        localStorage.setItem('postState', JSON.stringify(state));
        set({state});
    },
    
    getPosts: async () : Promise<void> => {
        try {
            const posts = await axiosInstance.get('/getPosts');
            set({posts: posts.data});
        } catch (error : any) {
            error as {message: string};
            console.log(error.message);
        }
    }

}));

export default PostStore;