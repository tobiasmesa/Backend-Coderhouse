import { Router } from "express";
import productManager from "../services/products.services.js";
import { getRealTimeProducts } from '../controllers/views.controller.js'

const router = Router() 

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
})

router.get('/realtimeproducts', getRealTimeProducts)

export default  router