const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/NodeTaskDb')
.then( ()=> {
  console.log("database connected successfully!1");
}).catch( (e) => {
  console.log("error: ",e);
})

module.exports = connection; 