const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secretKey123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }    
}))
const Product = require("./modle/Product");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "Back-End")));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
const mongoose = require("mongoose")
mongoose.connect("enter url of mongoose")
.then(() => {
    console.log("conntected")
}).catch((err)=> {
    console.log(err)
})
const Altrict = require("./modle/Altrict")
app.get("/",(req,res) =>{
    if(req.session.user){
        res.sendFile(__dirname + "/Back-End" + "/index.html");
        return;
    }else{
        res.sendFile(path.join(__dirname, "Back-End", "login.html"));
        // ksj
    }
    


})
app.post("/sign",async (req,res) =>{
    console.log(req.body);
    const user = req.body.username;
    const pas = req.body.password;
    const foundUser = await Altrict.findOne({ username: user });
    if(foundUser){
        res.redirect("/sign.html?error=UserExists");
        // res.sendFile(path.join(__dirname, "Back-End", "sign.html"));
        return;
    }
    const hashPas = await bcrypt.hash(pas,10);
    const alrtice = await new Altrict({
        username : user,
        password : hashPas
    })
    await alrtice.save();
    req.session.user = user;
    res.redirect("/");
    // res.sendFile(path.join(__dirname, "Back-End", "index.html"));
    
})
app.post("/login", async (req, res) => {
  const user = req.body.username;   
  const pas = req.body.password;    


  const foundUser = await Altrict.findOne({ username: user });

  if (!foundUser) {
    return res.redirect("/login.html?error=UserNotFound");
    // return res.sendFile(path.join(__dirname, "Back-End", "login.html"));
  }


  const isPasswordValid = await bcrypt.compare(pas, foundUser.password);

  if (isPasswordValid) {
    req.session.user = user;
    res.redirect("/");
    // res.sendFile(__dirname + "/Back-End" + "/index.html"); 
  } else {
    res.redirect("/login.html?error=UserNotFound");
  }
});

app.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.session.user) return res.redirect("/login.html");
    const { name, des, price } = req.body;
    if (!name || !des || !price) return res.status(400).send("Missing required fields");
    const filePath = req.file ? "/uploads/" + req.file.filename : "";
    const product = new Product({
      name,
      des,
      price: Number(price),
      file: filePath
    });
    await product.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Server error");
    // return "ksj";
  }
});




app.get("/products", async (req, res) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    
    const products = await Product.find();
    res.json(products);
});


app.listen(3000, () =>{
    console.log("server is running on port 3000");
})