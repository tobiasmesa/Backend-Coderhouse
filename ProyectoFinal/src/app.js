import express from 'express';
import router from '../routes/routerCarts.js';

const PORT =  8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
    console.log(`🚀 Server started on port http://localhost:${PORT}`)
})


app.use("/api/carts", router)



server.on('error', (err) => console.log(err))