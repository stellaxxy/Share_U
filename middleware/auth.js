const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');

module.exports = (request, response, next)=>{
  const token = request.headers['x-access-token'] || request.cookies.token;

  if(!token){
      //throw new Error('Unauthorized user');
      response.send({success: false, error: ['Unauthorized user']});
  } else {
      jwt.verify(token, secretKey.secret, (err, decoded)=>{
          if(err){
              //throw new Error('Unauthorized user: Invalid token');
              response.send({success: false, error: ['Unauthorized user: Invalid token']});
          } else {
              request.username = decoded.username;
              next();
          }
      })
  }
};