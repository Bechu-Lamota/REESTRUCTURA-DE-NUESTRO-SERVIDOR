const { Router } = require('express')
const ProductsController = require('../controllers/productsController')

const productsController = new ProductsController()
const productsRouter = new Router()

productsRouter.get('/', 
 productsController.getProducts.bind(productsController)
)

productsRouter.get('/:id', 
 productsController.getProductById.bind(productsController)
)

productsRouter.post('/', 
 productsController.addProduct.bind(productsController)
)

productsRouter.put('/:id', 
 productsController.updateProduct.bind(productsController)
)

productsRouter.delete('/:id', 
 productsController.deleteProduct.bind(productsController)
)

module.exports = productsRouter