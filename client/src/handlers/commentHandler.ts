import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";
import CommentStore from "../store/commentStore";

type CommentType = {
    comment: string;
    postId: string;
}

const {getComments} = CommentStore.getState();

class CommentHandler {
    public newComment = async (data: CommentType) : Promise<boolean> => {
        let status = false;
        try {
            const res = await axiosInstance.post('/newComment', data);
            getComments({postId: String(data.postId)});
            res.status === 201 ? status = true : status = false;
        } catch (error) {
            error as {message: any};
            if (isAxiosError(error)) {
                console.log(error.message);
                toast.error('SERVER ERROR');
            }
        }
        return status;
    }
}

export default CommentHandler;