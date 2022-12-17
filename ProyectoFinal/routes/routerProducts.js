import { Router } from 'express'
import ProductManager from '../src/services/ProductManager.js'

let pm = new ProductManager('./src/products.json');


const router = Router()


router.get('/', (req, res) => {
    const { limit } = req.query;
    const products = pm.getProducts();
    if (limit){
      res.send(products.slice(0, limit))
    } else 
    {
      res.send(products)
      
    }
    res.status(200)
})

router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = pm.getProductById(Number(pid));
    if (product)
    {
      res.status(200).json(product)
    } else {
      res.status(404)
    }
})

router.post('/', (req, res) => {
  const { title , description,  code, price, status, stock, category, thumbnails } = req.body

  if( title && description && price && code && stock && category)
  {
    pm.addProduct({ title, description, code, price, status, stock, category, thumbnails })
    res.status(200).send("Agregado!")
  } else {
    res.status(400).send("No se ha agregado!")
  }
})


export default router