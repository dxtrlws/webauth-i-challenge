const express = require('express')
const userRoutes = require('./routes/userRoutes')
const session = require('express-session')
const SessionStore = require('connect-session-knex')(session)

const server = express()
server.use(express.json())


const sessionConfig = {
    name: 'userApp',
    secret: 'super secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
    },
    store: new SessionStore({
        knex: require('./data/dbConfig'),
        tablename: 'sessions',
        createtable: true,
        clearInterval: 60 * 60 * 1000
    })
}

server.use(session(sessionConfig))
// Routes
server.use('/api/', userRoutes)
server.get('/', (req, res) => {
    res.send('Server running')
});

module.exports = server