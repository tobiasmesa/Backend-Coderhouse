import { Router } from 'express'

const router = Router()
const carts = []


router.get('/:pid', (req, res) => {
    console.log(req.params.pid)
    res.json(carts)
    res.status(200)
})


router.post('/', (req, res) => {
    carts.push(req.body)
    res.status(201).json(carts)
})


export default router