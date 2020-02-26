const router = require('express').Router();
const User = require('./users/user-helpers.js/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id,
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, process.env.JWT_SECRET || 'asdflasdfl', options);
}
router.post('/register', (req, res) => {
    const { username, password, name, email, age } = req.body;
    User.addUser({username, password: bcrypt.hashSync(password, 8), name, email, age })
        .then(id => {
            res.status(201).json({ Message: 'User Registeration Succesful', id });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Message: 'Error Registering User'});
        });
});

module.exports = router;