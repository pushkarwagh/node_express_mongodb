const jwt = require('jsonwebtoken')

const userModel = require("./models/userSchema.js");
const productModel = require("./models/productSchema.js");


exports.getConnection = async (req, res) => {
  try {
    res.send("connection successfull!!");
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createUserRegister = async (req, res) => {
  const user = new userModel(req.body);
  console.log("create-user", user);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createLogin = async (req, res) => {
  const user = await new userModel(req.body);
  console.log("login-user", user);
  
  try {
    const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY, {expiresIn:'5m'});
    console.log("token---",token);
    // await user.save();
    res.status(200).send(`loged-in successfully!! token ---- ${token} `);
    
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await productModel.find({});
  console.log("get-all-products", products);
  try {
    res.send(products);
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProduct = async (req, res) => {
  const product = await productModel.find({ _id: req.params.id });
  console.log("get-product", product);
  try {
    res.send(product);
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createProduct = async (req, res) => {
  const product = new productModel(req.body);
  console.log("add-product", product);
  try {
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProduct = async (req, res) => {
  console.log("product-id", req.params.id);
  // var myquery = { _id: req.params.id };
  // var newvalues = { $set: req.body };
  // const editproduct = new productModel(req.body);
  await productModel.findByIdAndUpdate({ _id: req.params.id} ,{$set: {...req.body} },{new: true})
  .then((product) => {
    if (!product) {
        return res.status(404).send();
    }
    res.send(product);
}).catch((error) => {
    res.status(500).send(error);
}); 

  // const newproduct = new productModel(myquery,newvalues);
    //  console.log("updated",product);
    //  product.save();
    // res.send(product);

  // products = products.map(p => p._id === req.params.id ? editproduct : p);
  // console.log("edit-product", editproduct);
  // try {
  //    await product.updateOne();
  //    console.log("updated",product);
  //    products.save();
  //   res.send(product);
  // } catch (error) {
  //   res.status(500).send(error);
  // }
};

exports.deleteProduct = async (req, res) => {
  console.log("product-id", req.params.id);
  let products = new productModel({ _id: req.params.id });
  // products = products.filter(p => p_id !== req.params.id);
  await products.deleteOne();
  res.send(products);
  // try{
  //   await products.save();
  //   res.send(products)
  // }catch(error) {
  //    res.status(500).send(error);
  // }
};
