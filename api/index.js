import express from "express";
import mongoose from "mongoose";
import expressLayouts from "express-ejs-layouts";
import serverless from "serverless-http";
import path from "path";

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------------- DATABASE ---------------- */
let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
};

/* ---------------- MODEL ---------------- */
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageurl: String,
});

const productModel =
  mongoose.models.products ||
  mongoose.model("products", productSchema);

/* ---------------- ROUTES ---------------- */
app.get("/", async (req, res) => {
  await dbConnect();
  const products = await productModel.find();
  res.render("index", { products });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/save", async (req, res) => {
  await dbConnect();
  await productModel.create(req.body);
  res.redirect("/");
});

app.get("/:id/edit", async (req, res) => {
  await dbConnect();
  const product = await productModel.findById(req.params.id);
  res.render("edit", { product });
});

app.post("/:id/save-product", async (req, res) => {
  await dbConnect();
  await productModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.get("/:id/delete", async (req, res) => {
  await dbConnect();
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

/* ---------------- EXPORT ---------------- */
export default serverless(app);