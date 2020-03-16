const router = require('express').Router();
const User = require('../users/user-helpers.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')

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

router.options('/register', cors())

router.post('/register', cors(), (req, res) => {
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

router.options('/login', cors())

router.post('/login', cors(), (req, res) => {
    const { username, password } = req.body;
    console.log('REQ BODY BEFORE GET FUNCTION: ', req.body)
    User.getByUsername(username)
        .then(user => {

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ Message: "Login Succesful!", token });
            } else {
                res.status(401).json({ Message: 'Error logging in' })
            }
        })
        .catch(err => {
            console.log('ERROR MESSAGE', err);
            console.log('REQ BODY IN CATCH', req.body);

            res.status(400).json({ Message: 'Error logging in' })
        })
})

module.exports = router;