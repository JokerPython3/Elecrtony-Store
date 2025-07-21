const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();
app.use(session({
  secret: 'secretKey123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }    
}))
app.use(express.static(path.join(__dirname, "Store")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const mongoose = require("mongoose")
mongoose.connect("enter url monggoes")
.then(() => {
    console.log("conntected")
}).catch((err)=> {
    console.log(err)
})
const Altrict = require("./modle/art.js")
app.post("/add", async (req,res) =>{
    const name = req.body.name;
    const des = req.body.des;
    const price = req.body.price;
    const file = req.body.file;
    const art = await new art({
        name:name,
        des:des,
        price:price,
        file:file ?? "",
    })
    await art.save();
    res.sendFile(path.join(__dirname, "Store", "index.html"));
})
app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});
