const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';
const {secretKey} = require('./config');
const mysql = require('mysql');
const db = require('./db');
const app = express();
/*
app.use(session({
    secret: secretKey.secret,
    resave: true,
    saveUninitialized: false
}));
 */
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/client/dist'));

app.post('/api/signup', async (request, response) => {
    try {
        if(!request.body.username || !request.body.email || !request.body.password){
            if(!request.body.username){
                throw new Error('Please provide valid username.');
            }
            if(!request.body.email){
                throw new Error('Please provide valid email.');
            }
            if(!request.body.password){
                throw new Error('Please provide valid password.');
            }
        } else {
            let {username, email, password} = request.body;

            const checkQuery = "SELECT * FROM `users` WHERE `username` = ? OR `email` = ?";
            const checkInsertInfo = [username, email];
            const checkFormattedQuery = mysql.format(checkQuery, checkInsertInfo);
            const checkResult = await db.query(checkFormattedQuery);
            if(checkResult.length !== 0){
                if(checkResult[0].username === username){
                    throw new Error('Username is taken.');
                } else if(checkResult[0].email === email) {
                    throw new Error('Email is taken');
                }
            }

            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, async (err, hash) => {
               if(err){
                   throw new Error('Sorry an error has occurred. Please try again later.');
               } else {
                   password = hash;
                   const query = "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)";
                   const insertInfo = [username, email, password];
                   const formattedQuery = mysql.format(query, insertInfo);
                   const result = await db.query(formattedQuery);

                   if(!result){
                        throw new Error('SQL error!');
                   }
                   response.send({success: true});
               }
            });
        }
    } catch(err) {
        handleError(response, err.message);
    }
});

app.post('/api/login', async (request, response) => {
    try {
        if(!request.body.username && !request.body.email){
            throw new Error('Please provide valid username or email.');
        }
        if(!request.body.password){
            throw new Error('Please provide valid password.');
        }
        const {username, email, password} = request.body;
        let getHashQuery = "SELECT `password`, `id`, `username` FROM `users` WHERE";
        let value = "";
        if(username){
            getHashQuery = getHashQuery + " `username` = ?";
            value = username;
        } else if(email){
            getHashQuery = getHashQuery + " `email` = ?";
            value = email;
        }
        let result = await db.query(getHashQuery, [value]);

        if(result.length !== 1){
            throw new Error('There is no matching username or email.');
        }

        let hash = result[0].password;

        bcrypt.compare(password, hash, (err, res) => {
            try {
                if(err){
                    throw new Error('Sorry an error has occurred.');
                }
                if(res){
                    //request.session.loggedin = true;
                    //request.session.userid = result[0].id;
                    const payload = {userid: result[0].id};
                    const token = jwt.sign(payload, secretKey.secret, {expiresIn: '1h'});

                    response.cookie('token', token, {httpOnly: true}).send({success: true});
                } else {
                    throw new Error('Incorrect password.');
                }
            } catch(err) {
                handleError(response, err.message);
            }
        })
    } catch(err) {
        handleError(response, err.message);
    }
});

app.post('/api/friendship', auth, async (request, response) => {
    //make sure first user id is smaller than second user id
    //type: follow/ unfollow/ block/ unblock
    try{
        if(!request.userid || !request.body.secondUserId || !request.body.type){
            throw new Error('Missing information');
        }
        const {secondUserId, type} = request.body;
        const {userid} = request;
        let checkInfo = [];

        const checkQuery = "SELECT * FROM `userfriendship` WHERE `user_first_id` = ? AND `user_second_id` = ?";
        if(userid < secondUserId){
            checkInfo = [userid, secondUserId];
        } else {
            checkInfo = [secondUserId, userid];
        }

        const checkResult = await db.query(checkQuery, checkInfo);

        let updateType = '';
        let query = '';
        if(checkResult.length !== 0){
            let condition = '';

            if(type === 'follow'){
                condition = userid < secondUserId ? 'second_follow_first' : 'first_follow_second';
                if(checkResult[0].type === condition){
                    updateType = 'mutual_follow';
                }
            } else if(type === 'unfollow'){
                condition = userid < secondUserId ? 'first_follow_second' : 'second_follow_first';
                if(checkResult[0].type === condition){
                    updateType = 'delete';
                } else if(checkResult[0].type === 'mutual_follow'){
                    updateType = userid < secondUserId ? 'second_follow_first' : 'first_follow_second';
                }
            } else if(type === 'block'){
                condition = userid < secondUserId ? 'second_block_first' : 'first_block_second';
                if(checkResult[0].type === condition){
                    updateType = 'mutual_block';
                } else {
                    updateType = userid < secondUserId ? 'first_block_second' : 'second_block_first';
                }
            } else if(type === 'unblock'){
                condition = userid < secondUserId ? 'first_block_second' : 'second_block_first';
                if(checkResult[0].type === condition){
                    updateType = 'delete';
                } else if(checkResult[0].type === 'mutual_block'){
                    updateType = userid < secondUserId ? 'second_block_first': 'first_block_second';
                }
            }

            if(updateType === 'delete'){
                query = "DELETE FROM `userfriendship` WHERE `user_first_id` = ? AND `user_second_id` = ?";
            } else {
                query = "UPDATE `userfriendship` SET `type` = ? WHERE `user_first_id` = ? AND `user_second_id` = ?";
                checkInfo.unshift(updateType);
            }
        } else {
            query = "INSERT INTO `userfriendship` (`user_first_id`, `user_second_id`, `type`) VALUES (?, ?, ?)";
            if(type === 'follow'){
                updateType = userid < secondUserId ? 'first_follow_second' : 'second_follow_first';
            } else if(type === 'block'){
                updateType = userid < secondUserId ? 'first_block_second' : 'second_block_first';
            }
            checkInfo.push(updateType);
        }
        const result = await db.query(query, checkInfo);

        if(result.affectedRows === 1){
            response.send({success: true});
        } else {
            throw new Error('Sorry an error has occurred');
        }
    } catch(err) {
        handleError(response, err.message);
    }
});

app.post('/api/addnewsfeed', auth, async (request, response) => {
    try {
        if(!request.userid){
            throw new Error('Missing user id');
        } else if(!request.body.imgLocation){
            throw new Error('Missing image');
        }

        const ownerId = request.userid;
        const {description, location, imgLocation} = request.body;
        console.log('img location:', typeof imgLocation);
        const newsfeedQuery = "INSERT INTO `newsfeed` (`ownerId`, `description`, `time`, `location`) VALUES (?, ?, NOW(), ?)";
        const newsfeedInfo = [ownerId, description, location];
        const newsfeedResult = await db.query(newsfeedQuery, newsfeedInfo);

        console.log('newsfeed result:', newsfeedResult);

        if(newsfeedResult.affectedRows === 1 && newsfeedResult.insertId){
            const imgQuery = "INSERT INTO `images`(`newsfeedId`, `imgLocation`) VALUES ?";
            const arrOfImgs = imgLocation.map(item => {
                return [newsfeedResult.insertId, item];
            });
            console.log('arr of imgs:', arrOfImgs);
            //const imgInfo = [newsfeedResult.insertId, imgLocation];
            const imgResult = await db.query(imgQuery, [arrOfImgs]);

            console.log('img result:', imgResult);
            if(imgResult.affectedRows > 0){
                response.send({success: true});
            } else {
                const delQuery = "DELETE FROM `newsfeed` WHERE `id` = ?";
                const delInfo = [newsfeedResult.insertId];
                const delResult = await db.query(delQuery, delInfo);
                console.log('delete result', delResult);
                if(delResult.affectedRows === 1){
                    throw new Error('Failed to add new newsfeed.');
                } else {
                    throw new Error('Failed to add new newsfeed images and to delete newsfeed item from newsfeed table.');
                }
            }
        } else {
            throw new Error('Failed to add new newsfeed.');
        }
    } catch(err) {
        handleError(response, err.message);
    }
});

app.get('/api/newsfeed', auth, (request, response) => {
    console.log('request:', request);
    response.send({
        success: true
    });
});

app.listen(PORT, () => {
    console.log('Server Running at localhost:' + PORT);
}).on('error', (err) => {
    console.log('Server listen error, you probably already have a server on PORT:' + PORT)
});

function handleError(response, error){
    response.send({success: false, error: [error]});
}