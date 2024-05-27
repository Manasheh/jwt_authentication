const { db } = require('../config/db.js')



//register a new user
const register = async ({email, password}) => {
    try {
        const [user] = await db('usersjwt').insert({email, password}, ['id', 'email']);
        return user;
    } catch (error) {
        console.log('Error in register model',error);
        throw new Error('Register failed')
    }
}


//login

const login = async(email) => {
    try {
        const user = await db('usersjwt')
        .select('id', 'email', 'password')
        .where({email})
        .first();
        return user || null;
    } catch (error) {
        console.log('Error in model',error);
        throw new Error('Login failed')
    }
}

const all = async () => {
    try {
        const users = await db('usersjwt').select('id', 'email').orderBy('id');
        return users;
    } catch (error) {
        console.log({message: 'error in get all users'});
        throw new Error('Could not get all users')
    }
}
module.exports = { register, login, all }