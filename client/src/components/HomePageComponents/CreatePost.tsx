import { ArrowUp, Plus } from "lucide-react";
import React from "react";
import ImageHandler from "../../handlers/ImageHandler";
import postHandler from "../../handlers/postHandler";
import toast from "react-hot-toast";

type ModalState = {
    onClose: () => void;
}

type CreateType = {
    image?: string;
    title: string;
    genre: string;
    description: string;
    video?: File;
    videoPreview: string;
    loading: boolean;
    type: string | undefined;
    accessType: string;
}

class CreatePost extends React.Component<ModalState, CreateType> {

    constructor (props: ModalState) {
        super(props);
        this.state = {
            title: "",
            description: "",
            genre: "",
            loading: false,
            type: '',
            videoPreview: '',
            accessType: 'public'
        }
    }
    
    private GENRE : Array<String> = [
        "NSFW",
        "ART",
        "IRL",
        "GAMING",
        "VIDEO",
        "ADULT",
        "FOOD"
    ];

    private handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
       
        if (!image) return;
        
        if (image.type.includes('image')) {
            this.setState({video: undefined});

            const l = new ImageHandler({image});
            const formattedImage = await l.format();
            
            this.setState({type: 'image'});
            this.setState({image: String(formattedImage)});
        } else if (image.type.includes('video')) {
            const videoSize = image.size / (1024 ** 2);
            if (videoSize >= 80) return toast.error('File too big!'); 

            this.setState({image: undefined});
            this.setState({type: 'video'});
            this.setState({video: image});

            const preview = URL.createObjectURL(image);
            this.setState({videoPreview: preview});
        }

    }

    private createPost = async (e: React.FormEvent<HTMLFormElement>) : Promise<object | Error> => {
        e.preventDefault();
        try {
            this.setState({loading: true});
            const c = new postHandler(this.state);
            const newPost = await c.createPost();
            return newPost;
        } catch (error : any) {
            error as {message: string};
            console.log(error.message);
            throw error;
        } finally {
            this.setState({loading: false});
        }
    }

    private handleInput (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render(): React.ReactNode {
        return (
            <div className="w-full h-screen bg-black/40 fixed z-99 flex items-center justify-center" onClick={this.props.onClose}>
                <div 
                    className="p-10 w-90 h-130 overflow-auto sm:w-150 sm:h-200 lg:w-200 lg:h-200 md:h-200 md:w-150 rounded-xl shadow-2xl bg-base-200" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1>CREATE POST</h1>
                    <div className="mt-5 border-base-300 border-b-2"/>
                    <form onSubmit={(e) => this.createPost(e)} className="mt-5">
                        <p className="mb-2">Title</p>
                        <input onChange={(e) => this.handleInput(e)} value={this.state.title} name="title" type="text" className="input w-full mb-2" placeholder="TITLE" required/>
                        <p className="mb-2">Description</p>
                        <textarea onChange={(e) => this.handleInput(e)} value={this.state.description} name="description" className="textarea w-full mb-2" placeholder="DESCRIPTION" required/>
                        <p className="mb-2">Upload File</p>
                        {this.state.type?.includes('image') && this.state.image
                        ? (
                        <label className="w-full h-auto">
                            <input onChange={(e) => this.handleImage(e)} type="file" accept="image/*, video/*" hidden/>
                            <img src={this.state.image} alt="img" className="hover:opacity-80 transition-opacity cursor-pointer w-full rounded-xl shadow-xl"/>
                        </label>
                        ) 
                        : this.state.type?.includes('video') && this.state.video
                        ? (
                            <label className="w-full h-auto">
                                <input onChange={(e) => this.handleImage(e)} type="file" accept="image/*, video/*" hidden/>
                                <video src={this.state.videoPreview} autoPlay className="w-full hover:opacity-80 transition-opacity cursor-pointer rounded-xl shadow-xl"></video>
                                <p className="text-gray-500 text-center">File sizes is still in the works. The recommended size at the moment is 10mb.</p>
                            </label>
                        ) 
                        : (
                        <label className="w-full h-50 bg-base-200 hover:bg-base-300 border-dashed border rounded-sm flex items-center justify-center cursor-pointer">
                            <input onChange={(e) => this.handleImage(e)} type="file" hidden/>
                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                <Plus/>
                                <h1>ADD FILE</h1>
                                <p className="text-sm text-gray-400">(Minimum of 50mb)</p>
                            </div>
                        </label>
                        )}
                        <h1 className="text-xl mt-5 w-full text-center">CHOOSE GENRE</h1>
                        <div className="flex gap-3 sm:gap-10 md:gap-10 lg:gap-15 items-center justify-center h-10 w-ful mt-5">
                            {this.GENRE.map((genre, i) => {
                                return (
                                    <div key={i} className="flex-col text-center">
                                        <p className="text-gray-500">{genre}</p>
                                        <input onChange={(e) => this.handleInput(e)} value={String(genre)} type="radio" name="genre" className="radio radio-md" required/>
                                    </div>
                                );
                            })}
                        </div>
                        <h1 className="text-xl mt-3 mb-3">VIEWING</h1>
                        <div className="w-full h-auto flex gap-3">
                            <h1>PRIVATE</h1>
                            <input onChange={() => this.setState({accessType: 'private'})} type="radio" name="radio-1" className="radio"/>
                            <h1>PUBLIC</h1>
                            <input onChange={() => this.setState({accessType: 'public'})} type="radio" name="radio-1" defaultChecked className="radio" />
                        </div>
                        <div className="w-full text-center mt-10">
                            <button 
                                type="submit" 
                                disabled={this.state.loading} 
                                className="btn btn-success shadow-xl rounded-xl text-xl w-50 h-15"
                            >
                                {this.state.loading 
                                    ? (
                                        <span className="loading loading-dots loading-md"></span>
                                    ) 
                                    : (
                                        <>
                                        <ArrowUp size={30}/>
                                        POST
                                        </>
                                    )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreatePost;