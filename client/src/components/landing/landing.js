import React, {Component} from 'react';
import DetailBox from "../detailBox";

class Landing extends Component {
    render(){
        return (
            <div className="landingDiv">
                <div className="landingHeading">Share U</div>
                <div className="landingBody">
                    <DetailBox/>
                </div>
            </div>
        )
    }
}

export default Landing;