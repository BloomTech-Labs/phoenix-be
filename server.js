const express = require('express');   
const server = express();


server.use(express.json());



server.get("/", (req, res) => {
    res.send(`<h2>PhoeNicks</h2>`);
})


module.exports = server;

