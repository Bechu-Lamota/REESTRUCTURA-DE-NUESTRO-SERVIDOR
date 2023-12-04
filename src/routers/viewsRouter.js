const { Router } = require('express')
const ProductsController = require('../controllers/productsController')

const viewsRouter = Router()
const productController = new ProductsController()

viewsRouter.get('/products', async (req, res) => {
    await productController.getProducts(req, res)
})

module.exports = viewsRouter