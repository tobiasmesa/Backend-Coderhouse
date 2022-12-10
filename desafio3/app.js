import  ProductManager   from "./ProductManager.js";
import express from "express";

let pm = new ProductManager("./products.json");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/products", (req, res) => {
  const { limit } = req.query;
  const products = pm.getProducts();
  if (limit){
    res.send(products.slice(0, limit))
  } else 
  {
    res.send(products)
  }
})


app.get("/products/:pid", (req, res) => {
  const { pid } = req.params;
  const product = pm.getProductById(Number(pid));
  if (product)
  {
    res.status(200).json(product)
  } else {
    res.status(404)
  }
})



const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);

server.on("error", (err) => console.log(err));
