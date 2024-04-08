const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')
const User = require('./models/User')

const app = express()

//Config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

//Public folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')
conn.sync().then(() => {
 app.listen(5000)
})
.catch((err) => console.log(err))
