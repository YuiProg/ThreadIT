import React, { useEffect } from "react";
import ThreadStore from "../../store/threadStore";

type ThreadTypes = {
    name: string;
    description: string;
    image_url: string;
    icon_url: string;
    maxLength: number;
}

type ThreadPropType = {
    data: ThreadTypes[];
}

class Threads extends React.Component<ThreadPropType> {
    constructor (props: ThreadPropType) {
        super(props);
    }

    // componentDidUpdate(prevProps: Readonly<ThreadPropType>): void {
        
    // }

    render () : React.ReactNode {
        const {data} = this.props;
        return (
            <div className="w-full h-screen">
                
            </div>
        );
    }
}

const ThreadWrapper : React.FC = () => {

    const { threads, getThreads } = ThreadStore();

    useEffect(() => {
        getThreads();
    }, []);

    return <Threads data={threads}/>
}

export default ThreadWrapper;

