import express from 'express';

import routerCarts from './routes/products.routes.js';
import routerProducts from './routes/carts.routes.js'

import { engine } from 'express-handlebars';
import routerViews from './routes/views.routes.js'

const PORT =  8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
    console.log(`🚀 Server started on port http://localhost:${PORT}`)
})



app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)

// - Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use('/', routerViews);

server.on('error', (err) => console.log(err))