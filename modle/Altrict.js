const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const alrtice = new Schema({
    username: String,
    password: String,
 
})
const Altrict = mongoose.model("Altrict", alrtice);
module.exports =Altrict;