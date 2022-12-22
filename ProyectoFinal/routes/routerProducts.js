import { Router } from "express";
import ProductManager from "../src/services/ProductManager.js";


const router = Router();

router.get("/", (req, res) => {
  const { limit } = req.query;
  const products = ProductManager.getProducts();
  if (limit) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
  res.status(200);
});

router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const product = ProductManager.getProductById(Number(pid));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  if (title && description && price && code && stock && category) {
    ProductManager.addProduct({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });
    res.status(200).send("Added!");
  } else {
    res.status(400).send("Sorry, we couldn't add that product.");
  }
});

router.put("/:pid", (req, res) => {
  const id = req.params.pid;
  const data = req.body;
  try {
      Object.entries(data).forEach(([key, value]) => {
        ProductManager.updateProduct(Number(id), key, value)
    })
    res.status(200).send("Updated" );
  } catch (error) {
    res.status(400).send("It didn't work!")
  }
});

router.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  if(pid) {
    ProductManager.deleteProduct(Number(pid));
    
  } else {
    res.status(400).send("Provide a product id!"); 
  }
  res.status(200).send("Deleted"); 
  
});

export default router;
