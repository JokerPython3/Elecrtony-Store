const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const alrtice = new Schema({
    name: String,
    des: String,
    price: Number,
    file:Image ?? ""
 
})
const Altrict = mongoose.model("Altrict", alrtice);
module.exports =Altrict;