const express = require('express');   
const server = express();

const usersRouter = require('./routes/users/user-router')


server.use(express.json());

server.use('/api/users', usersRouter)



server.get("/", (req, res) => {
    res.send(`<h2>PhoeNicks</h2>`);
})


module.exports = server;

