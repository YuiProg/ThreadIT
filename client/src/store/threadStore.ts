import {create} from 'zustand';
import ThreadHandler from '../handlers/threadHandler';

type ThreadTypes = {
    name: string;
    description: string;
    image_url: string;
    icon_url: string;
    maxLength: number;
}

type ThreadStoreTypes = {
    threads: ThreadTypes[];
    getThreads: () => Promise<ThreadTypes[] | Error>;
}

const ThreadStore = create<ThreadStoreTypes>((set) => ({
    threads: [],

    getThreads: async () : Promise<ThreadTypes[] | Error> => {
        
        try {
            const handleThread = new ThreadHandler({
                name: '',
                description: '',
                image_url: '',
                icon_url: '',
                maxLength: 0
            });

            const fetchedData = await handleThread.fetchThreads();
            set({threads: fetchedData});
            return fetchedData;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}));

export default ThreadStore;