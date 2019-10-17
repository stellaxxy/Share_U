const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';
const mysql = require('mysql');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

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