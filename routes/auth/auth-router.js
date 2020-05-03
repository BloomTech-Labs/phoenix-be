const router = require('express').Router();
const User = require('../users/user-helpers.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

router.options('/register', cors());

router.post('/register', cors(), (req, res) => {
  let users = req.body;
  const hash = bcrypt.hashSync(users.password, 8);
  users.password = hash;

  User.addUser(users)
    .then(id => {
      const token = generateToken(id[0]);
      res
        .status(201)
        .json({ Message: 'User Registration Successful', id, token });
    })
    .catch(err => {

      res.status(500).json({ Message: 'Error Registering User', Error: err });
    });
});

router.options('/login', cors());

router.post('/login', cors(), (req, res) => {
  const { username, password } = req.body;

  User.getByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ Message: 'Login Successful!', token });
      } else {
        res.status(401).json({ Message: 'Error logging in', Error: err });
      }
    })
    .catch(err => {
      res.status(500).json({ Message: 'Error logging in', Error: err });
    });
});

module.exports = router;
