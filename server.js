const express = require('express')
const dotenv = require('dotenv')
// const mongoose = require('mongoose')

const app = express()

require('./connection.js')
const routes = require('./router.js')
// mongoose.connect('mongodb://localhost:27017/NodeTaskDb')
// .then( ()=> {
//   console.log("database connected successfully!1");
// }).catch( (e) => {
//   console.log("error: ",e);
// })

app.use(express.json())
app.use(routes)

dotenv.config()
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is created at ${port}`)
})