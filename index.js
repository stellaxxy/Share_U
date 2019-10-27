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

app.post('/api/signup', (request, response) => {
    try {
        if(!request.body.username || !request.body.email || !request.body.password){
            if(!request.body.username){
                throw new Error('Please provide valid username.');
            }
            if(!request.body.email){
                throw new Error('Please provide valid email.');
            }
            if(!request.body.password){
                throw new Error('Please provide valid password');
            }
        } else {
            let {username, email, password} = request.body;
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
            if(err){
                throw new Error('Sorry an error has occurred.');
            }
            if(res){
                //request.session.loggedin = true;
                //request.session.userid = result[0].id;
                const payload = {username: result[0].username};
                const token = jwt.sign(payload, secretKey.secret, {expiresIn: '1h'});

                response.cookie('token', token, {httpOnly: true}).send({success: true});
            } else {
                throw new Error('Incorrect password.');
            }
        })
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