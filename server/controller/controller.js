const { register, login, all } = require('../model/model.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


//token here
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY} = process.env;

const _login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login(email.toLowerCase());
        //if user exits
        if(!user) return res.status(404).json({message: 'Email not found'})

        //if password is correct
        const isMatch = bcrypt.compareSync(password +'', user.password)
        if (!isMatch) return res.status(401).json({message: 'Invalid password'})
        

        //generate token
        const accesstoken = jwt.sign(
            {id: user.id, email: user.email},   //this is the decode
            ACCESS_TOKEN_SECRET,
            {expiresIn: ACCESS_TOKEN_EXPIRY || '60s'}
        );
        res.cookie('token', accesstoken, 
        {httpOnly: true, maxAge: 60 * 1000})
        res.json({token:accesstoken})

    } catch (error) {
        console.log('_login=>', error);
        res.status(500).json({message: 'Login failed'})
    }
}

const _register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const loweremail = email.toLowerCase();
        const salt =  bcrypt.genSaltSync(10)
        const hashpassword = bcrypt.hashSync(password +'', salt)
        const newuser = await register({email: loweremail, password: hashpassword});
        res.json(newuser)
    } catch (error) {
        console.log('_register=>', error);
        res.status(500).json({message: 'Register failed'})
    }
}

const _all = async (req, res) => {
    try {
        const allusers = await all();
        res.json(allusers)
    } catch (error) {
        console.log('_all=>', error);
        res.status(500).json({message: 'users not found'})
    }
}

module.exports = { _register, _login, _all }