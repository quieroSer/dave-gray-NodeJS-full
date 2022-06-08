//initialize the DB and setUsers property
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}
// node modules neded for this controller
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async(req, res) => {
    const {user , pwd } = req.body
    if (!user || !pwd) return res.status(404).json({'message': 'Username and password are required'})
    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === user)
    if (duplicate) return res.status(409) // 409 signifies a conflict
    try {
        // encrypt the password
        //El segundo parametro es la 'sal', puede ser otro string o un numero q significa el numero de rondas
        //que va a hacerse la funcion hash
        const hashedPwd = await bcrypt.hash(pwd, 10)
        //store the new user
        const newUser = { "username": user, "password": hashedPwd}
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users)
        res.status(201).json({'success': `New user ${user} created!`})
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = { handleNewUser }