const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles)
        // create JWTs
        const accessToken = jwt.sign(
            { "UserInfo": {
                "username": foundUser.username,
                "roles": roles                
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s'}
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // Saving refreshToken with current user in the local "DB" (its only a file) 
        const otherUsers = usersDB.users.filter( p => p.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken}
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        // Sending the refresh token in an HTTP_only cookie to the user
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        // Senfing the access Token as a JSON object to the frontend
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };