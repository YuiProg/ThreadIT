import React from "react";
import ThreadStore from "../../store/threadStore";

class Threads extends React.Component {
    
    componentDidMount(): void {
        const { getThreads } = ThreadStore.getState()
        console.log(getThreads());
    }
    
    constructor (props: any) {
        super(props);
    }

    render () : React.ReactNode {
        return (
            <div className="w-full h-screen">

            </div>
        );
    }
}

export default Threads;

