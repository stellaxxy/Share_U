import React, {Component} from 'react';
import '../../assets/css/landing.scss';
import DetailBox from "../detailBox";
import userImg from '../../../../dummyData/images/firsticon.jpg';
import detailImg from '../../../../dummyData/images/newsfeed1.jpg';
import axios from "axios";
import Nav from "../nav";

class Landing extends Component {
    async componentDidMount() {
        const result = await axios.get('/api/newsfeed');

        if(!result.data.success){
            if(result.data.error[0] === "Unauthorized user" || result.data.error[0] === "Unauthorized user: Invalid token"){
                this.props.history.push('/login');
            }
        }
    }

    render(){
        let comments = [
            {
                id: 1,
                commentatorId: 2,
                commentatorUsername: 'abc',
                commentatorIcon: './images/user.jpg',
                content: 'good option',
                commentId: null
            },
            {
                id: 2,
                commentatorId: 3,
                commentatorUsername: 'edf',
                commentatorIcon: './images/user3.jpg',
                content: 'amazing',
                commentId: 1
            },
            {
                id: 3,
                commentatorId: 4,
                commentatorUsername: 'fgi',
                commentatorIcon: './images/user4.jpg',
                content: 'good picture',
                commentId: null,
                likes: [
                    {
                        id: 2,
                        likeOwnerId: 2,
                        likeOwnerUsername: 'abc',
                        likeOwnerIcon: './images/user2.jpg'
                    }
                ]
            }];

        let likes = [
            {
                id: 1,
                likeOwnerId: 2,
                likeOwnerUsername: 'abc',
                likeOwnerIcon: './images/user2.jpg'
            }
        ];
        return (
            <div className="landingDiv">
                <div className="landingHeading">
                    <div className="landingTitle">Share U</div>
                </div>
                <div className="landingBody newsfeedDiv">
                    <DetailBox username="xxy" ownerIcon={userImg} images={[detailImg]} time="15 hours ago" comments={comments} likes={likes} description="pretty night stars"/>
                </div>
                <div className="landingBottom">
                    <Nav/>
                </div>
            </div>
        )
    }
}

export default Landing;