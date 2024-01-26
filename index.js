const express = require('express')
const { connection } = require('./db')
const { userRouter } = require('./route/user.route')
const { bugRouter } = require('./route/bug.route')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express())
app.use(express.json())
app.use(cors())

app.use('/', userRouter)
app.use('/', bugRouter)

app.listen(process.env.PORT, async()=> {
    try {
        await connection
        console.log('connected to the db');
        console.log('server running on port ');
    } catch (error) {
        console.log(error);
    }
})