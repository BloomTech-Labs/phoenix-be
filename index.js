const server = require("./server");

// const port = process.env.PORT || 5000;
const port = 5555;

server.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
})