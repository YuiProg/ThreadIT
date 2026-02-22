import { isAxiosError } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import PostStore from "../store/postStore";
import AuthStore from "../store/authStore";

type LikeObjectType = {
    _id: string;
    username: string;
    userImage: string;
}

type PostType = {
    title: string;
    description: string;
    genre: string;
    userImage?: string;
    upvote?: LikeObjectType[];
    downvote?: LikeObjectType[];
    commentCount?: number;
    image?: string;
    imageId?: string;
    video?: any;
    videoId?: string;
    createdAt?: string;
    accessType: boolean;
}

const {getPosts} = PostStore.getState();
const {AuthUser} = AuthStore.getState();

class postHandler {

    private data = {} as PostType;
    constructor (data : PostType) {
        this.data = data;
    }
    

    public createPost = async () : Promise<PostType | Error> => {
        try {
            const { title, description, genre, image, video, accessType } = this.data;
            
            if (image) {
                const newPost = await axiosInstance.post<PostType>('/createImagePost', this.data);
                this.data = newPost.data;
            }
            
            if (video) {
                const formdata = new FormData();
                formdata.append('file', video);
                formdata.append('title', title);
                formdata.append('description', description);
                formdata.append('genre', genre);
                formdata.append('accessType', String(accessType));
                
                const newPost = await axiosInstance.post('/createVideoPost', formdata);
                this.data = newPost.data;
            }
            getPosts();
            return this.data;
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error('FILE TOO LARGE');
            }
            throw error;
        }
        
    }
    

    public getPosts = async () : Promise<PostType[] | Error> => {
        try {
            const posts = await axiosInstance.get<PostType[]>('/getPosts');
            return posts.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.message);
                toast.error('server error');
            }
            throw error;
        }
    }

    public getSinglePost = async (id: string) : Promise<PostType> => {
        try {
            const post = await axiosInstance.get<PostType>(`/getPost/${id}`);
            return post.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.message);
                toast.error('server error');
            }
            throw error;
        }
    }

    public likePost = async (id: string, post: object) : Promise<PostType> => {
        try {
            const postdata = post as { post: PostType };
             //pag nakalike na unlike naman yung request
            if (postdata.post.upvote?.some((like) => like._id === AuthUser?._id)) {
                const unlikePost = await this.unlikePost(id);
                getPosts();
                return unlikePost;
            }

            if (postdata.post.downvote?.some((like) => like._id === AuthUser?._id)) {
                await axiosInstance.put<PostType>(`/undownvotePost/${id}`);
                getPosts();
                //no need to return anything here proceed na sa like request then fetch ulet ng posts.
            }

            const updated_post = await axiosInstance.put<PostType>(`/likePost/${id}`);

            getPosts();
            return updated_post.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.message);
                toast.error('server error');
            }
            throw error;
        }
    }

    public unlikePost = async (id: string) : Promise<PostType> => {
        try {
            const updated_post = await axiosInstance.put<PostType>(`/unlikePost/${id}`);
            getPosts();
            return updated_post.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.message);
                toast.error('server error');
            }
            throw error;
        }
    }

    public downvotePost = async (id: string, post: object) : Promise<PostType> => {
        try {

            const postdata = post as { post: PostType };

            if (postdata.post.downvote?.some((like) => like._id === AuthUser?._id)) {
                const res = await this.undownvotePost(id);
                getPosts();
                return res;
            }

            if (postdata.post.upvote?.some((like) => like._id === AuthUser?._id)) {
                await axiosInstance.put<PostType>(`/unlikePost/${id}`);
                getPosts();
                //no need to return anything here proceed na sa downvote request then fetch ulet ng posts.
            }

            const res = await axiosInstance.put<PostType>(`/downvotePost/${id}`);
            getPosts();
            return res.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.message);
                toast.error('server error');
            }
            throw error;
        }
    }

    public undownvotePost = async (id: string) : Promise<PostType> => {
        try {        
            const res = await axiosInstance.put<PostType>(`/undownvotePost/${id}`);
            getPosts();
            return res.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.message);
                toast.error('server error');
            }
            throw error;
        }
    }
}

export default postHandler;