require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error) => console.error('The error is', error));
db.once('open', () => console.log("connection established"))

app.use(express.json())

const peopleRoutes = require('./routes/users')
app.use('/users', peopleRoutes)

app.listen(3000, () => console.log("Server Started"))