const router = require('express').Router();
const User = require('../users/user-helpers.js');
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
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}
router.post('/register', (req, res) => {
    let users = req.body;
    const hash = bcrypt.hashSync(users.password, 8)
     users.password = hash
    
    User.addUser(users)
        .then(id => {
            res.status(201).json({ Message: 'User Registeration Succesful', id });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Message: 'Error Registering User'});
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('outside', req.body)
    User.getByUsername(username)
        .then(user => {
            console.log('inside', username)
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ Message: "Login Succesful!", token });
            } else {
                res.status(401).json({ Message: 'Error logging in' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Message: 'Error logging in' })
        })
})

module.exports = router;