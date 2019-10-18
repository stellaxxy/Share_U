const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';
const mysql = require('mysql');
const db = require('./db');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

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

app.get('/api/newsfeed', (request, response) => {
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
    response.status(500).send({success: false, error: [error]});
}