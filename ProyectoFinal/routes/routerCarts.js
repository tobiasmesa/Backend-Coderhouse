import { Router } from 'express'

import cartManager from '../src/services/CartManager.js'
import productManager from '../src/services/ProductManager.js'

const router = Router()


router.post('/:cid/product/:pid', async (req, res) => {
try {
    let { cid, pid } = req.params
    cid = Number(cid)
    pid = Number(pid)

    // Check if product id exist
    productManager.getproductById(pid)
    await cartManager.addProductToCart(cid, pid)

    res.status(201).json({
      success: true,
      message: 'Product added to cart OK'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

})


router.post('/', async (req, res) => {
    try {

        await cartManager.createNewCart()
    
        res.status(201).json({
          success: true,
          message: 'Cart created OK'
        })
    
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        })
      }
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = Number(req.params.cid)
    
        const cart = await cartManager.getCartById(cid)
    
        let product = {}
        const products = []
    
        for await (const element of cart.products) {
          product = await productManager.getproductById(element.product)
          products.push(product)
        }
    
        res.status(200).json({
          success: true,
          cartId: cid,
          products: products
        })
    
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        })
      }
})

export default router