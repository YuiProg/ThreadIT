import React from "react";
import Rightpanel from "../components/HomePageComponents/Rightpanel";
import PostsWrapper from "../components/HomePageComponents/Posts";


class Homepage extends React.Component {
    render() : React.ReactNode {
        return (
            <>
            <div className="pt-15 w-full flex ">
                <Rightpanel/>
                <div className="flex-1 overflow-y-auto">
                    <div className="w-full p-5">
                        <h1 className="font-bold text-xl">POSTS</h1>
                        <p>sort by</p>
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