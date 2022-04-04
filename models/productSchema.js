const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },
  brand: {
    type: String,    
  },
  price: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
    default: 0
  },
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;