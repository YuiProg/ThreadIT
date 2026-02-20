import React, { useEffect } from "react";
import PostStore from "../../store/postStore";
import { Expand, Share, ThumbsDown, ThumbsUp, User } from "lucide-react";
import { Link } from "react-router-dom";
import convertTime from "../../helpers/convertTime";
import postHandler from "../../handlers/postHandler";
import AuthStore from "../../store/authStore";
import { div } from "motion/react-client";
import ThreadStore from "../../store/threadStore";

type PostType = {
    title: string;
    username: string;
    description: string;
    userImage?: string;
    genre: string;
    image?: string;
    video?: string;
    _id?: string;
    upvote?: Array<any>;
    downvote?: Array<any>;
    createdAt?: string;
}

type PostsProps = {
    posts: PostType[] | null;
    state: boolean;
    userId: string;
}

type PostState = {
    state: boolean;
}


//pag may useffect na gagamitin better to warp the class in a function

class Posts extends React.Component<PostsProps, PostState> { 
    constructor (props: PostsProps) {
        super(props);
        this.state = {
            state: props.state
        }
    }
    
    componentDidUpdate(prevProps: PostsProps) {
        if (prevProps.state !== this.props.state) {
            this.setState({ state: this.props.state });
        }
    }
    
    private formatTime = new convertTime();
    private handleLike = new postHandler({title: "", description: "", genre: "", private: false});

    render(): React.ReactNode {
        const { state } = this.state;
        const posts = this.props.posts;
        return (
            !state 
                ? (
                <div className="w-full h-auto p-4 sm:p-10 overflow-auto">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, i) => (
                        <div key={i} className="w-full flex flex-col sm:flex-row items-start sm:items-center border-2 border-l-0 border-base-300 border-r-0 p-4 sm:p-5 mb-5 hover:scale-101 transition-all gap-4">
                            <div className="w-full sm:w-50 shrink-0">
                                {post.image ? (
                                    <img loading="lazy" src={post.image} alt="postImage" className="w-full h-48 sm:h-30 rounded-md object-cover"/>
                                ) : post.video ? (
                                    <div className="w-full sm:w-50 h-auto">
                                        <video src={post.video} muted className="w-full rounded-md" />
                                    </div>
                                ) : null}
                            </div>
                            <div className="w-full flex flex-col ml-0 sm:ml-5 p-2">
                                <div className="flex">
                                {post.userImage
                                    ? (
                                        <img src={post.userImage || '../images/usericon.png'} alt="profilePic" className="w-7 h-7 cursor-pointer rounded-full"/>
                                    ) 
                                    : (
                                        <div className="w-7 flex items-center justify-center h-7 border rounded-full">
                                            <User size={20}/>
                                        </div>
                                    )}
                                <h1 className="underline ml-2 font-light text-gray-400 cursor-pointer">{post.username}</h1>
                                <p className="ml-2 font-light text-gray-400">{this.formatTime.ConvertDate(String(post.createdAt))}</p>
                                </div>
                                <div className="overflow-hidden w-full flex flex-col items-start mt-2 border-t border-base-300 pt-2">
                                    <h1 className="font-bold text-xl">{post.title}</h1>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Link to={`/post/${post._id}`}>
                                            <button className="btn">
                                                <Expand/>
                                            </button>
                                        </Link>
                                        <button className="btn"><Share/></button>
                                        <button className={`btn ${post.upvote?.some((like) => like?._id === this.props.userId) && "btn-active"}`} onClick={() => this.handleLike.likePost(String(post._id), {post: post})}><ThumbsUp/>{post.upvote?.length || 0}</button>
                                        <button className={`btn ${post.downvote?.some((like) => like?._id === this.props.userId) && "btn-active"}`} onClick={() => this.handleLike.downvotePost(String(post._id), {post: post})}><ThumbsDown/>{post.downvote?.length || 0}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    Array.from({length: 5}).map((_, i) => {
                        return (
                        <div key={i}>
                            <div className="flex">
                                <div className="skeleton h-12 w-12 rounded-full mb-5 mr-2"/>
                                <div className="flex flex-col gap-0">
                                    <div className="skeleton h-3 w-32 rounded-full mb-5"/>
                                    <div className="skeleton h-3 w-50 rounded-full mb-5"/>
                                </div>
                            </div>
                            <div className="skeleton h-30 w-full mb-8"></div>   
                        </div>
                        );
                    })
                )}
            </div>
                ) : (
                    <div className="w-full h-auto p-6 sm:p-10 overflow-auto flex flex-col items-center">
                    {Array.isArray(posts) && posts.length > 0 
                        ? (
                            posts.map((post, i) => {
                                return (
                                        <div key={i} className="rounded-xl shadow-2xl mb-8 w-full transition-all">
                                            <div className="bg-base-300 w-full p-6 rounded-lg flex items-center gap-4">
                                                {post.userImage
                                                    ? (
                                                            <img src={post.userImage} alt="dp" className="rounded-full w-16 h-16 object-cover"/>
                                                    ) : (
                                                            <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
                                                                <User size={22} />
                                                        </div>
                                                    )}
                                                <div className="flex flex-col">
                                                        <span className="font-medium text-lg">{post.username}</span>
                                                        <span className="text-sm text-gray-400">{this.formatTime.ConvertDate(String(post.createdAt))}</span>
                                                </div>
                                            </div>
                                            {post.image 
                                                ? (
                                                        <img src={post.image} alt="image" className="w-full h-80 sm:h-220 object-cover" />
                                                ) 
                                                : post.video 
                                                ? (
                                                        <video src={post.video} className="w-full h-80 sm:h-auto object-cover" controls />
                                                ) : null}
                                                <div className="bg-base-300 p-6 rounded-b-lg">
                                                    <h2 className="font-bold text-2xl mb-3">{post.title}</h2>
                                                    <div className="flex flex-wrap gap-3 items-center">
                                                        <Link to={`/post/${post._id}`}>
                                                            <button className="btn btn-md">
                                                                <Expand/>
                                                            </button>
                                                        </Link>
                                                        <button className="btn btn-md"><Share/></button>
                                                        <button 
                                                            className={`btn btn-md ${post.upvote?.some((like) => like?._id === this.props.userId) && "btn-active"}`}
                                                            onClick={() => this.handleLike.likePost(String(post._id), {post: post})}
                                                        >
                                                                <ThumbsUp/>{post.upvote?.length || 0}
                                                        </button>
                                                        <button className={`btn btn-md ${post.downvote?.some((like) => like?._id === this.props.userId) && "btn-active"}`} onClick={() => this.handleLike.downvotePost(String(post._id), {post: post})}><ThumbsDown/>{post.downvote?.length || 0}</button>
                                                    </div>
                                                </div>
                                        </div>
                                    );
                            })
                        ) 
                        : (
                            Array.from({length: 5}).map((_, i) => {
                                return (
                                <div key={i} className="bg-base-200 rounded-xl shadow-2xl p-3 mb-20 w-full max-w-full h-200">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="skeleton h-12 w-12 rounded-full mb-2"/>
                                        <div className="flex-1">
                                            <div className="skeleton w-32 h-3 rounded-full mb-2"/>
                                            <div className="skeleton w-48 h-3 rounded-full mb-2"/>
                                        </div>
                                    </div>
                                    <div className="skeleton h-160 sm:h-150 w-full mt-4"/>                               
                                </div>
                                );
                            })
                        )}
                    </div>
                )
        );
    }
}

type ThreadTypes = {
    threads: Array<object>;
}

class Threads extends React.Component<ThreadTypes> {
    constructor(props: any) {
        super(props);
        console.log(props);
    }
    render () : React.ReactNode {
        return (
            <div>
                <h1>wow</h1>
            </div>
        );
    }
}


const PostsWrapper : React.FC = () => {
    const {posts, getPosts, state, view} = PostStore();
    const { threads, getThreads } = ThreadStore();
    const {AuthUser} = AuthStore();

    useEffect(() => {
        getPosts();
        getThreads();
    }, [getPosts]);

    if (!AuthUser) return;

    return (
        view === 'post' ? <Posts posts={posts} state={state} userId={AuthUser._id}/> : <Threads threads={threads}/>
    );
}

export default PostsWrapper;