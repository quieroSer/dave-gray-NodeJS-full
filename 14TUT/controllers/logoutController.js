const User = require('../model/User')

const handleLogout = async(req, res) => {
    // on client, also delete the access Token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;

    // is refreshToken in DB?
    const foundUser = await User.findOne({refreshToken}).exec()
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});
        res.sendStatus(204);
    }

    //Delete refreshToken in db
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}) // secure: true - only serves in https
    res.sendStatus(204)
    
}

module.exports = { handleLogout }