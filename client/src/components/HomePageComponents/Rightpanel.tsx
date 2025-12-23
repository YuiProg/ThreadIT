import React from "react";

class Rightpanel extends React.Component {

    constructor (props: object) {
        super(props);
    }

    render () : React.ReactNode {
        return (
            <div className="md:w-50 lg:w-80">
                <div className="fixed hidden md:w-50 md:block lg:w-80 h-screen bg-base-300">
                    
                </div>
            </div>
        );
    }
}

export default Rightpanel;