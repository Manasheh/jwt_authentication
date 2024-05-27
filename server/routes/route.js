const express = require('express')
const { _register, _login, _all } = require('../controller/controller.js')

const {verifyToken} = require('../middlewares/verifyToken.js')

const router = express.Router()

router.post('/register', _register)
router.post('/login', _login)
router.get('/all', verifyToken, _all)

router.get('/verify', verifyToken, (req, res) => {
    // console.log(req);
    //can create a new token here
    res.send(200)
})

module.exports = router

//cookies are store in the session
//cookies are stored in the browser
//token is stored in the server
//how does session, cookies, token work together
