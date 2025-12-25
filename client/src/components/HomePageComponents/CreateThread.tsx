import { Plus } from "lucide-react";
import React from "react";

interface CreatePostProps {
    onClose: () => void;
    userImage: string;
}

class CreatePost extends React.Component<CreatePostProps> {
    constructor(props: CreatePostProps) {
        super(props);
    }
    render(): React.ReactNode {
        return (
            <div onClick={this.props.onClose} className="w-full h-screen bg-black/40 fixed z-99 flex items-center justify-center">
                <div onClick={(e) => e.stopPropagation()} className="w-400 h-200 bg-base-200 rounded-xl shadow-xl overflow-hidden">
                    <div className="w-full h-20 border-b-2 border-base-300 p-10 flex items-center">
                        <h1 className="text-2xl">CREATE THREAD</h1>
                    </div>
                    <form className="p-10 pt-5 w-full h-full flex flex-col gap-5">
                        <div className="w-full flex flex-col gap-5 items-center justify-center">
                        <h1 className="text-xl">Thread Icon</h1>
                        <label className="w-40 h-40 rounded-full border border-dashed">
                            
                        </label>
                        </div>
                        
                        <h1 className="text-xl">Thread border image</h1>
                        <label className="flex items-center justify-center w-full h-80 rounded-sm border border-dashed hover:bg-base-300 cursor-pointer">
                            <input type="file" hidden/>
                            <div className="flex-col items-center justify-center flex gap-2">
                                <Plus/>
                                <h1 className="text-xl">Upload Image</h1>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreatePost;