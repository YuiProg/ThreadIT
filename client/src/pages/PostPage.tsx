import React from "react";
import { Navigate, useParams } from "react-router-dom";
import postHandler from "../handlers/postHandler";
import toast from "react-hot-toast";
import { Ellipsis, ThumbsDown, ThumbsUp } from "lucide-react";
import convertTime from "../helpers/convertTime";
import CommentWrapper from "../components/Comments";
import AuthStore from "../store/authStore";

type PostProps = {
    _id: string;
}

type PostStateType = {
    post: {
        title: string;
        description: string;
        userImage?: string;
        username?: string;
        image?: string;
        video?: string;
        createdAt?: string;
        upvote?: Array<object>;
        downvote?: Array<object>;
    } | null;
    loading: boolean;
}

class PostPage extends React.Component<PostProps, PostStateType> {
    
    constructor (_id: PostProps) {
        super(_id);
        this.state = {
            post: null,
            loading: false
        }
    }
    
    private formatTime = new convertTime();

    componentDidMount(): object | void {
        this.getPost();
    }

   

    private handleLike = new postHandler({title: "", description: "", genre: ""});

    private getPost = async () => {
        try {
            this.setState({loading: true});
            const post = await this.handleLike.getSinglePost(this.props._id);
            this.setState({post: post});
        } catch (error) {
            toast.error('ERROR');
            console.log(error);
        } finally {
            this.setState({loading: false});
        }
    }


    render(): React.ReactNode {
        
        if (this.state.loading) return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className="loading loading-xl loading-spinner"></span>
            </div>
        );
        
        return (
            <>
            <div className="w-full h-auto pt-15 md:p-15 p-3">
                <div className="w-full h-30 mt-5 flex items-center border-b border-base-300">
                    <img src={this.state.post?.userImage} alt="profilePic" className="rounded-full w-20 h-20 object-cover"/>
                    <div className="flex-col">
                        <h1 className="ml-5 font-bold text-xl">{this.state.post?.username}</h1>
                        <p className="ml-5 text-gray-400">{this.formatTime.ConvertDate(String(this.state.post?.createdAt))}</p>
                    </div>
                </div>
                <div className="w-full mt-5 border-b border-base-300">
                    <p className="text-gray-400">TITLE:</p>
                    <h1 className="text-2xl font-semibold">{this.state.post?.title}</h1>
                    <p className="text-gray-400">DESCRIPTION:</p>
                    <h2 className="text-xl">{this.state.post?.description}</h2>
                    <div className="flex gap-2 mb-5 mt-5">
                        <button className="btn" onClick={() => {
                            this.handleLike.likePost(String(this.props._id)).then((post) => {
                                this.setState({post});
                            });
                        }}><ThumbsUp/>{this.state.post?.upvote?.length || 0}</button>
                        <button className="btn"><ThumbsDown/>{this.state.post?.downvote?.length || 0}</button>
                        <button className="btn"><Ellipsis/></button>
                    </div>
                </div>
                <div className="flex items-center justify-center border-b border-base-300">
                    {this.state.post?.image 
                        ? (
                            <img src={this.state.post.image} alt="image" className="w-300 h-200 object-contain rounded-xl bg-base-300 mt-5 mb-5"/>
                        ) 
                        : (
                            <video src={this.state.post?.video} controls className="w-300 h-auto rounded-xl mt-5 mb-5"></video>
                    )}
                </div>
                <CommentWrapper/>
            </div>
            </>
        );
    }
}

function PostPageWrapper () {

    const { id } = useParams();
    const {AuthUser} = AuthStore();

    if (!AuthUser) return <Navigate to='/login'/>;
    if (!id) return;
    return <PostPage _id={id}/>
}

export default PostPageWrapper;