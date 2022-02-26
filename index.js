const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')

//whitelisting domains
const whiteList = [
    "http://localhost"
]

app.use(cors({
    origin: whiteList
}))

app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection Successful!')
}).catch(err => console.log(err))

const PORT = process.env.PORT || 4000

const jwtverification = require('./middlewares/jwtverification')

const parentAuthRoute = require('./routes/parent/auth')
app.use('/parent', parentAuthRoute)

const parentDashboard = require('./routes/parent/dashboard')
app.use('/parent/dashboard', jwtverification, parentDashboard)

const childAuthRoute = require('./routes/children/auth')
app.use('/child', childAuthRoute)

const childDashboard = require('./routes/children/dashboard')
app.use('/child/dashboard', jwtverification, childDashboard)

app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`)
})