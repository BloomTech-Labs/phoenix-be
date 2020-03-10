const server = require("./server");

const dbPort = process.env.DB_PORT;

const PORT = process.env.PORT || dbPort || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
})