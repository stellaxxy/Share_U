import React, {Component} from 'react';
import userImg from '../../../../dummyData/images/firsticon.jpg';
import detailImg from '../../../../dummyData/images/newsfeed1.jpg';
import likeIcon from '../../assets/images/likeicon.png';
import commentIcon from '../../assets/images/dialog2.png';
import bookmarkIcon from '../../assets/images/bookmark.png';

class DetailBox extends Component {
    render(){
        let numOfLikesStr = '';
        let viewCommtStr = '';

        if(this.props.likes.length === 1){
            numOfLikesStr = `1 Like`;
        } else {
            numOfLikesStr = `${this.props.likes.length} Likes`;
        }
        if(this.props.comments.length === 1){
            viewCommtStr = `View 1 comment`;
        } else {
            viewCommtStr = `View all ${this.props.comments.length} comments`;
        }

        return (
            <div className="detailDiv">
                <div className="detailTop">
                    <div className="detailOwnerIcon">
                        <img src={this.props.ownerIcon} alt="user image"/>
                    </div>
                    <div className="detailUsername username">{this.props.username}</div>
                </div>
                <div className="detailMiddle">
                    <div className="detailPicDiv">
                        <img src={this.props.images[0]} alt="detail picture"/>
                    </div>
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
                    <div className="totalLikes">{numOfLikesStr}</div>
                    <div className="detailDescription">
                        <div className="username">{this.props.username}</div>
                        <div className="description">{this.props.description}</div>
                    </div>
                    <div className="viewCommtBtn">{viewCommtStr}</div>
                    <div className="time">
                        <div>{this.props.time}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailBox;