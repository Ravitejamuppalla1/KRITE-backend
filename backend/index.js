const express = require('express')
const cors = require('cors')
const AWS = require('aws-sdk')
const configureDB = require('./config/Database')




const route = require('./config/Route')
const app = express()
const port = 3020
app.use(cors())
app.use(express.json())

app.listen(port, (req, res) => {
  console.log(`welcome to port ${port}`)
})
configureDB()
app.use(route)