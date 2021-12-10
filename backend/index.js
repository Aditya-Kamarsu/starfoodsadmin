const connectToMongo = require('./db');

const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

//routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/orders',require('./routes/orders'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

connectToMongo();