const express = require('express')
const app = express()
const port = process.env.port || 5001
require('./config/config.js')
const router = require('./routers')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)

app.listen(port, () => {
    console.log(port);
})
