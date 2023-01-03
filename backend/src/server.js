import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

const port = process.env.PORT || 4000
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(
    process.env.MONGO_URL,
).then(async res => {
    console.log('MongoDB connected.')
    if (process.env.MODE === 'Reset') {
        console.log('Reset Mode: reset the data')
        dataInit()
    }
})

routes(app)
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
