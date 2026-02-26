// import express from "express"
// const app = express();

// app.set("view engine", "ejs")   //

// app.get("/", (req, res)=> {
//     // res.json({message: "hello world"})
//     res.render("index", {name:"john"})
// });

// const products = [
//     {id:1,name:"Product1", price:2000},
//     {id:2,name:"Product2", price:3000},
//     {id:3,name:"Product3", price:4000}
// ]

// app.get("/products",(req, res)=>{
//     res.render("products", {products})
// } )



// app.listen(8000)


import express from "express";
import mongoose from "mongoose";
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const dbConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017/merndatabase");
};
const startServer = async () => {
  await dbConnect();
  app.listen(8080, () => console.log("Server started"));
};
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageurl: { type: String, required: true },
});
const productModel = mongoose.model("products", productSchema);
app.get("/", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});
app.post("/", async (req, res) => {
  const body = req.body;
  const result = await productModel.create(body);
  res.json({ message: "Product created" });
});
startServer();






