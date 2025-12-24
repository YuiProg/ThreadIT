import { Send } from "lucide-react";
import React, { useEffect } from "react";
import CommentHandler from "../handlers/commentHandler";
import { useParams } from "react-router-dom";
import CommentStore from "../store/commentStore";
import convertTime from "../helpers/convertTime";
import toast from "react-hot-toast";

type CommentType = {
    postId: string;
    comments: Array<{
        _id: string;
        userId: string;
        username: string;
        profilePic: string;
        postId: string;
        comment: string;
        createdAt: string;
    }>;
}

type CommentStateType = {
    comment: string
}

class Comments extends React.Component<CommentType, CommentStateType> {

    constructor(props: CommentType) {
        super(props);
        this.state = {
            comment: ""
        }
    }

    private commentHandler = new CommentHandler();
    private timeConvert = new convertTime();

    private newComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postId = this.props.postId;
        const comment = this.state.comment;

        const res = await this.commentHandler.newComment({postId, comment});
        if (!res) return toast.error('Failed to comment.');
        toast.success('Comment successfull.'); 
        this.setState({comment: ""});
    }

    render(): React.ReactNode {
        return(
            <div className="w-full h-auto mt-5">
                <h1 className="text-2xl">COMMENTS</h1>
                <div className="w-full h-auto max-h-100 bg-base-200 p-5 rounded-xl mt-5 overflow-auto">
                    {this.props.comments.length != 0 
                    ? (
                        this.props.comments.map((d, i) => {
                            return (
                                <div key={i} className="w-full h-20 bg-base-300 rounded-xl flex mb-5 p-3">
                                    <div className="w-20 h-auto flex items-center">
                                        <img src={d.profilePic} alt="profilePic" className="w-15 h-15 rounded-full"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-lg cursor-pointer">
                                            {d.username} 
                                            <span className="ml-2 text-gray-400">
                                                {this.timeConvert.ConvertDate(String(d.createdAt))}
                                            </span>
                                        </h1>
                                        <p>{d.comment}</p>
                                    </div>
                                </div>
                            );  
                        })
                    )
                    : (
                        <div className="w-full h-full flex items-center justify-center">
                            <h1 className="text-xl text-gray-400">NO COMMENTS FOUND</h1>
                        </div>
                    )}
                </div>
                {/* NEW COMMENT TAB */}
                <form onSubmit={(e) => this.newComment(e)} className="w-full h-10 md:h-20 flex items-center mt-5 mb-5">
                    <input value={this.state.comment} onChange={(e : React.ChangeEvent<HTMLInputElement>) => this.setState({comment: e.target.value})} type="text" className="input w-full h-full bg-base-300 text-xl md:text-2xl" placeholder="Enter comment here"/>
                    <button type='submit' className="btn w-15 h-15 md:w-20 md:h-20 rounded-full ml-2 md:ml-5 bg-base-300"><Send/></button>
                </form>
            </div>
        );
    }
}

const CommentWrapper : React.FC = () => {

    const {id} = useParams();
    const {comments, getComments} = CommentStore();

    useEffect(() => {
        getComments({postId: String(id)});
    }, [getComments]);

    if (!comments) return;

    return <Comments postId={String(id)} comments={comments}/>
}

export default CommentWrapper;
