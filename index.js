const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection Successful!')
}).catch(err => console.log(err))

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Okay working!')
})

app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`)
})