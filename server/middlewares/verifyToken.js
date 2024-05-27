// to verify our token 

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const {ACCESS_TOKEN_SECRET} = process.env;

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.token || req.headers['x-access-token'];
    if(!accessToken) return res.status(401).json({message: 'You are not authenticated'})
    //if i have the token, i need to verify it
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json({message: 'Forbidden'})

        //set user info request eg
        req.userid = decode.id;
        req.useremail = decode.email;

        req.user = decode;
        next();
    })
}

module.exports = {verifyToken};