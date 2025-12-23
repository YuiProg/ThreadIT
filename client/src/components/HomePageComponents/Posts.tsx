import React, { useEffect } from "react";
import PostStore from "../../store/postStore";
import { Expand, Share, ThumbsDown, ThumbsUp, User } from "lucide-react";
import { Link } from "react-router-dom";
import convertTime from "../../helpers/convertTime";

type PostType = {
    title: string;
    username: string;
    description: string;
    userImage?: string;
    genre?: string;
    image?: string;
    video?: string;
    _id?: string;
    upvote?: Array<object>;
    downvote?: Array<object>;
    createdAt?: string;
}

type PostsProps = {
    posts: PostType[] | null;
}


//pag may useffect na gagamitin better to warp the class in a function

class Posts extends React.Component<PostsProps> { 

    constructor (posts: PostsProps) {
        super(posts);
        
    }

    private formatTime = new convertTime();

    
    render(): React.ReactNode {
        const posts = this.props.posts;
        return (
            <div className="w-full h-auto p-10 overflow-auto">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, i) => (
                        <div key={i} className="w-full h-40 flex items-center border-2 border-l-0 border-base-300 border-r-0 p-5 mb-5 hover:scale-101 transition-all">
                            <div className="w-60">
                                {post.image ? (
                                    <img loading="lazy" src={post.image} alt="postImage" className="w-full h-30 rounded-md object-cover"/>
                                ) : post.video ? (
                                    <div className="w-50 h-auto">
                                        <video src={post.video} muted className="rounded-md" />
                                    </div>
                                ) : null}
                            </div>
                            <div className="w-full h-full flex-col ml-5 p-2">
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
                                <div className="overflow-hidden w-full h-20 flex-col items-center mt-2 border-t border-base-300">
                                    <h1 className="font-bold text-xl">{post.title}</h1>
                                    <div className="flex gap-2">
                                        <Link to={`/post/${post._id}`}>
                                            <button className="btn">
                                                <Expand/>
                                            </button>
                                        </Link>
                                        <button className="btn"><Share/></button>
                                        <button className="btn"><ThumbsUp/>{post.upvote?.length || 0}</button>
                                        <button className="btn"><ThumbsDown/>{post.downvote?.length || 0}</button>
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
        );
    }
}

function PostsWrapper() { //wtf is this shit na ai ko lang to
    const {posts, getPosts} = PostStore();

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return <Posts posts={posts} />;
}

export default PostsWrapper;