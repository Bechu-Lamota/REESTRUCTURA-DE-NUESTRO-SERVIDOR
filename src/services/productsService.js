const ProductsStorage = require('../managers/productsManager')

class ProductsService {
    constructor () {
        this.storage = new ProductsStorage()
    }
    
    getProducts () {
        return this.storage.getProducts()
    }

    getProductsById (id) {
        return this.storage.getProductById(id)
    }
    
    addProduct (body) {
        return this.storage.addProduct(body)
    }

    updateProduct (id, body) {
        return this.storage.updateProduct(id, body)
    }

    deleteProduct (id) {
        return this.storage.deleteProduct(id)
    }


}

module.exports = ProductsService