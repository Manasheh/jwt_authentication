import jwt from 'jsonwebtoken'

/*  
    *signature({id: userid, email:username}, secret-code, {expiresIn: '1h'})
*/

const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60; // 1 hour
const token = jwt.sign(
    {id:1, email: 'jjj@gmail.com', name: 'John'},
    '123456',
    {
        expiresIn:  expirationTime //expire time
    }
)

// console.log(token);

const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqampAZ21haWwuY29tIiwibmFtZSI6IkpvaG4iLCJpYXQiOjE3MTY3OTM0NTIsImV4cCI6MTcxNjkxMzQ1Mn0.2df83bXkpMjNh-DBbsNB6FttQqo0hbUyKtYfroyf3xY';



/* verify
    verify(token, secret-code, (err, decode) => {})
*/

jwt.verify(myToken, '123456', (err, decode) => {
    if(err) return console.log(err.message);
    console.log(decode);
} )