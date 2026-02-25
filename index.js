import express from "express"
const app = express();

app.set("view engine", "ejs")   //

app.get("/", (req, res)=> {
    // res.json({message: "hello world"})
    res.render("index", {name:"john"})
});

const products = [
    {id:1,name:"Product1", price:2000},
    {id:2,name:"Product2", price:3000},
    {id:3,name:"Product3", price:4000}
]

app.get("/products",(req, res)=>{
    res.render("products", {products})
} )



app.listen(8000)








