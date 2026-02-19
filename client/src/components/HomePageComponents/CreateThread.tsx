import { Plus } from "lucide-react";
import React from "react";
import ImageHandler from "../../handlers/ImageHandler";
import ThreadHandler from "../../handlers/threadHandler";

interface CreateThreadProps {
    onClose: () => void;
    userImage: string;
}

type CreateThreadStateType = {
    image_url: string;
    name: string;
    description : string;
    maxLength: number;
}

class CreateThread extends React.Component<CreateThreadProps, CreateThreadStateType> {
    constructor(props: CreateThreadProps) {
        super(props);
        this.state = {
            image_url: '',
            name: '',
            description: '',
            maxLength: 0
        }
    }

    handleImage = async (data : any) : Promise<void> => {
        const image = data.target.files?.[0];
        const imageHandler = new ImageHandler({image});
        const formattedImage = await imageHandler.format();
        
        this.setState({image_url: formattedImage});
    }

    handleOnChange = (key : string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        this.setState({...this.state, [key]: value});
        console.log(this.state);
    }

    handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const handleThread = new ThreadHandler(this.state);
        const newThread = await handleThread.createThread();
        console.log(newThread);
    }

    render(): React.ReactNode {
        return (
            <div onClick={this.props.onClose} className="w-full h-screen bg-black/40 fixed z-99 flex items-center justify-center">
                <div onClick={(e) => e.stopPropagation()} className="w-200 h-200 bg-base-200 rounded-xl shadow-xl overflow-auto">
                    <div className="w-full h-20 border-b-2 border-base-300 p-10 flex items-center">
                        <h1 className="text-2xl">CREATE THREAD</h1>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)} className="p-10 pt-5 w-full h-auto flex flex-col items-center gap-5">
                        <div className="w-full flex flex-col gap-5 items-center justify-center">
                        <h1 className="text-xl">Thread Icon</h1>
                        <div className="w-40 h-40 rounded-full border border-dashed"/>
                        </div>
                        <h1 className="text-xl">Thread border image</h1>
                        <label className="flex items-center justify-center w-full h-80 rounded-sm border border-dashed hover:bg-base-300 cursor-pointer">
                            <input type="file" hidden onChange={(e) => this.handleImage(e)}/>
                            <div className="flex-col items-center justify-center flex gap-2">
                                <Plus/>
                                <h1 className="text-xl">Upload Image</h1>
                            </div>
                        </label>
                        <div className="w-full h-auto flex flex-col gap-5">
                            <h1 className="text-xl">Thread Name</h1>
                            <input type="text" onChange={(value) => this.handleOnChange('name', value)} className="input h-10 input-success w-full" placeholder="Enter Thread Title"/>
                            <h1 className="text-xl">Thread Members Length</h1>
                            <input type="number" onChange={(value) => this.handleOnChange('maxLength', value)} className="input h-10 input-success w-full" placeholder="Enter Max Thread Members"/>
                            <h1 className="text-xl">Thread Description</h1>
                            <textarea onChange={(value) => this.handleOnChange('description', value)} className="border border-xl h-50 p-2 border-success rounded-sm" placeholder="Enter Thread Description"></textarea>
                        </div>
                        <button type="submit" className="btn btn-success w-50">CREATE THREAD</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateThread;