const productModel = require('../models/productModel')

class ProductsMemory {
    constructor () {
      this.products = productModel
    }
  
    getProducts () {
      return this.products.find()
    }
  
    getProductById (id) {
      const product = this.products.findById(id)
  
      return product
    }
  
    addProduct (product) {
      product.id = this.products.length + 1
  
      this.products.push(product)
  
      return product
    }
  
    updateProduct (id, body) {
        const product = this.getProductById(id)
        
        if (!product) {
            return false
        }
        product = {...product, ...body}
        
        return product
    }
  
    async deleteProduct (id) {
        const product = this.getProductById(id)
  
        if (!product) {
        return false
      }
  
      this.products = this.products.slice(product, 1)
  
      return true
    }
  
  }
  
  module.exports = ProductsMemory