import React, {Component} from 'react';
import userImg from '../../../../dummyData/images/firsticon.jpg';
import detailImg from '../../../../dummyData/images/newsfeed1.jpg';
import likeIcon from '../../assets/images/likeicon.png';
import commentIcon from '../../assets/images/dialog2.png';
import bookmarkIcon from '../../assets/images/bookmark.png';

class DetailBox extends Component {
    render(){
        return (
            <div className="detailDiv">
                <div className="detailTop">
                    <div className="detailOwnerIcon">
                        <img src={userImg} alt="user image"/>
                    </div>
                    <div className="detailUsername">xxy</div>
                </div>
                <div className="detailMiddle">
                    <img src={detailImg} alt="detail picture"/>
                    <div className="detailBtmDiv">
                        <div className="likeBtn">
                            <img src={likeIcon} alt="like icon"/>
                        </div>
                        <div className="dialogBtn">
                            <img src={commentIcon} alt="comment icon"/>
                        </div>
                        <div className="bookmarkBtn">
                            <img src={bookmarkIcon} alt="bookmark icon"/>
                        </div>
                    </div>
                </div>
                <div className="detailBottom">
                    <div className="totalLikes">300 Likes</div>
                    <div className="detailDescription">
                        <div>xxy</div>
                        <div>detail description</div>
                    </div>
                    <div className="viewCommtBtn">View all 50 comments</div>
                    <div>
                        <div className="time">15 hours ago</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailBox;