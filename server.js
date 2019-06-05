const express = require('express')
const userRoutes = require('./routes/userRoutes')
const Users = require('.')

const server = express()
server.use(express.json())
server.use('/api/', userRoutes)

server.post('/', (req, res) => {
    res.send('Server running')
});

module.exports = server