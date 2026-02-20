import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";

type ThreadTypes = {
    name: string;
    description: string;
    image_url: string;
    maxLength: number;
}

class ThreadHandler {

    private data = {} as ThreadTypes;
    constructor (data : ThreadTypes) {
        this.data = data;
    }

    public createThread = async () : Promise<ThreadTypes[]> => {
        
        try {
            const createdThread = await axiosInstance.post('/newThread', this.data); 
            this.data = createdThread.data;
            return createdThread.data;
        } catch (error) {
            toast.error('Error');
            throw error;
        }
        
    }

    public fetchThreads = async () : Promise<ThreadTypes[]> => {
        let data = {} as ThreadTypes[];
        try {
            const fetchedThreads = await axiosInstance.get('/getThreads');
            data = fetchedThreads.data;
            return fetchedThreads.data;
        } catch (error : any) {
            toast.error('Error fetching threads');
            console.log(error.message);
        } finally {
            return data;
        }
    }
}

export default ThreadHandler;