const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  des: String,
  price: Number,
  file: String
});

module.exports = mongoose.model("Product", productSchema);
