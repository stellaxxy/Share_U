const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');

module.exports = (request, response, next)=>{
  const token = request.headers['x-access-token'] || request.cookies.token;

  if(!token){
      throw new Error('Unauthorized user');
  } else {
      jwt.verify(token, secretKey.secret, (err, decoded)=>{
          if(err){
              throw new Error('Unauthorized user: Invalid token');
          } else {
              if(decoded.username){
                  request.username = decoded.username;
              } else if(decoded.email){
                  request.email = decoded.email;
              }
              next();
          }
      })
  }
};