const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()
const app = express()
const users_router = require('./routes/route.js')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))

const PORT = 3000
app.use(express.json())
app.use(cookieParser())
app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}`);
})

app.use('/users', users_router)


// server.js > routes.js > controller.js > model.js> update/delete/get/post > database