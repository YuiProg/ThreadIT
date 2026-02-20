import React from "react";
// import Rightpanel from "../components/HomePageComponents/Rightpanel";
import PostsWrapper from "../components/HomePageComponents/Posts";
import { ChevronDown, Grid2X2, Rows3 } from "lucide-react";
import PostStore from "../store/postStore";

type HomePageState = {
    state: boolean;
}
const { setView } = PostStore.getState();
class Homepage extends React.Component<{}, HomePageState> {

    constructor (props: {}) {
        super (props);
        this.state = {
            state: PostStore.getState().state ?? false,
        };
    }


    render() : React.ReactNode {
        
        return (
            <>
            <div className="pt-15 w-full flex ">
                {/* <Rightpanel/> */}
                <div className="flex-1 overflow-y-auto">
                    <div className="w-full p-5 flex">
                        <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-0 text-xl">POSTS<ChevronDown/></div>
                            <ul tabIndex={-1} className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li onClick={() => setView('post')}><a>POST</a></li>
                                <li onClick={() => setView('threads')}><a>THREADS</a></li>
                            </ul>
                        </div>
                        <div className="flex ml-auto items-center">
                            <label 
                                className={`w-10 h-10 flex items-center border border-base-300 rounded-l-lg cursor-pointer ${!this.state.state ? 'bg-base-300' : ''}`} 
                                onClick={() => {
                                    PostStore.getState().setState(false);
                                    this.setState({state: false});
                                }}
                            >
                                <input name="radio" type="radio" checked={!this.state.state} readOnly className="w-10 h-10" hidden/>
                                <Rows3 className="mx-auto"/>
                            </label>
                            <label 
                                className={`w-10 h-10 flex items-center border border-base-300 rounded-r-lg cursor-pointer ${this.state.state ? 'bg-base-300' : ''}`} 
                                onClick={() => {
                                    PostStore.getState().setState(true);
                                    this.setState({state: true});
                                }}
                            >
                                <input name="radio" type="radio" checked={this.state.state} readOnly className="w-10 h-10" hidden/>
                                <Grid2X2 className="mx-auto"/>
                            </label>
                        </div>
                    </div>
                    <div className="w-full border-b-2 border-base-300"/>
                    <PostsWrapper/>
                </div>
            </div>
            </>
        );
    }
}

export default Homepage;