const express = require("express")
const jwt = require('jsonwebtoken')
const app = express()

var controler = require("./controlers.js")
var middleware = require("./middleware.js")

app.use(express.json())

app.get("/",controler.getConnection)

app.post("/register",controler.createUserRegister)
app.post("/login",middleware.auth,controler.createLogin)

app.post('/verifyuser', (req,res) => {
   const vrfy = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
   res.send(`user-verified..!!!${vrfy}`);
})

app.get('/products',controler.getAllProducts)
app.get("/product/:id",controler.getProduct)
app.post("/product",controler.createProduct)
app.patch("/product/:id",controler.updateProduct)
app.delete("/product/:id",controler.deleteProduct)


module.exports = app