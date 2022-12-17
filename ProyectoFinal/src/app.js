import express from 'express';
import routerCarts from '../routes/routerCarts.js';
import routerProducts from '../routes/routerProducts.js'

const PORT =  8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
    console.log(`🚀 Server started on port http://localhost:${PORT}`)
})


app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)


server.on('error', (err) => console.log(err))