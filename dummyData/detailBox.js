let detail = {
    success: true,
    data: {
        userId: 1,
        username: 'xxy',
        userIcon: './images/firsticon.jpg',
        newsfeedId: 1,
        location: 'Los Angeles',
        description: 'Great food',
        time: '07/07/2019',
        images: [
            "./images/newsfeed1.jpg",
            "./images/newsfeed2.jpg"
        ],
        likes: [
            {
                id: 1,
                likeOwnerId: 2,
                likeOwnerUsername: 'abc',
                likeOwnerIcon: './images/user2.jpg'
            }
        ],
        comments: [
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
            }
        ]
    }
}