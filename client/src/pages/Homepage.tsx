import React from "react";
import Rightpanel from "../components/HomePageComponents/Rightpanel";
import PostsWrapper from "../components/HomePageComponents/Posts";
import { Grid2X2, Rows3 } from "lucide-react";

type HomePageState = {
    state: boolean;
    grid: boolean;
    row: boolean;
}

class Homepage extends React.Component<{}, HomePageState> {

    constructor (props: {}) {
        super (props);
        this.state = {
            state: false,
            grid: false,
            row: true
        };
    }


    render() : React.ReactNode {
        return (
            <>
            <div className="pt-15 w-full flex ">
                <Rightpanel/>
                <div className="flex-1 overflow-y-auto">
                    <div className="w-full p-5 flex">
                        <div className="flex-col">
                            <h1 className="font-bold text-xl">POSTS</h1>
                            <p>sort by</p>
                        </div>
                        <div className="flex ml-auto items-center">
                            <label 
                                className={`w-10 h-10 flex items-center border border-base-300 rounded-l-lg cursor-pointer ${this.state.row ? 'bg-base-300' : ''}`} 
                                onClick={() => this.setState({row: true, grid: false})}
                            >
                                <input name="radio" type="radio" defaultChecked className="w-10 h-10" hidden/>
                                <Rows3 className="mx-auto"/>
                            </label>
                            <label 
                                className={`w-10 h-10 flex items-center border border-base-300 rounded-r-lg cursor-pointer ${this.state.grid ? 'bg-base-300' : ''}`} 
                                onClick={() => this.setState({row: false, grid: true})}
                            >
                                <input name="radio" type="radio" className="w-10 h-10" hidden/>
                                <Grid2X2 className="mx-auto"/>
                            </label>
                        </div>
                    </div>
                    <div className="w-full border-b-2 border-base-300"/>
                    <PostsWrapper state={this.state.state}/>
                </div>
            </div>
            </>
        );
    }
}

export default Homepage;