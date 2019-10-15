import React, {Component} from 'react';
import '../../assets/css/landing.scss';
import DetailBox from "../detailBox";

class Landing extends Component {
    render(){
        return (
            <div className="landingDiv">
                <div className="landingHeading">
                    <div className="landingTitle">Share U</div>
                </div>
                <div className="landingBody newsfeedDiv">
                    <DetailBox/>
                </div>
            </div>
        )
    }
}

export default Landing;