const express = require('express'); 
const cors = require('cors');  
const server = express();

require('dotenv').config();

const usersRouter = require('./routes/users/user-router')
const authRouter = require('./routes/auth/auth-router.js')
const authenticate = require('./routes/auth/auth-middleware')
const calendar = require('./routes/calendar/calendar-router.js')

server.use(cors());
server.use(express.json());

server.use('/api/users', authenticate, usersRouter)
server.use('/auth', authRouter)
server.use('/api/calendar', calendar)


server.get("/", (req, res) => {
  res.send(`<h2>PhoeNicks!</h2>`);
});

module.exports = server;
