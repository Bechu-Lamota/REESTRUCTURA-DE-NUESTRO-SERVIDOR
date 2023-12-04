const ProductsService = require('../services/productsService')

class ProductsController {
    constructor () {
        this.service = new ProductsService()
    }

    
    async getProducts(req, res) {
        try {
            const products = await this.service.getProducts();
            if (!products) {
                return res.status(404).json({
                    error: 'No se encontraron productos'
                })
            }
    
            return res.render('products', { products });
        } catch (error) {
            console.error('Error al obtener los productos', error);
            return res.status(500).json({
                error: 'Error interno del servidor'
            });
        }
    }

    async getProductById (req, res) {
        const { id } = req.params
        const product = await this.service.getProductsById(id)
    
        if (!product) {
          return res.status(404).json({
            error: 'Producto no encontrado'
          })
        }
    
        return res.json(product)
      }
    
    async addProduct (req, res) {
        const { body } = req
        const newProduct = await this.service.addProduct(body)
    
        if (!newProduct) {
          return res.status(500).json({
            error: 'No se pudo crear el producto'
          })
        }
    
        return res.status(201).json(newProduct)
      }
    
    async updateProduct (req, res) {
        const { id } = req.params
        const { body } = req
        const updatedProduct = await this.service.updateProduct(id, body)
    
        if (!updatedProduct) {
          return res.status(500).json({
            error: 'No se pudo actualizar el producto'
          })
        }
    
        return res.json(updatedProduct)
      }
    
    async deleteProduct (req, res) {
        const { id } = req.params
        const deletedProduct = await this.service.deleteProduct(id)
    
        if (!deletedProduct) {
          return res.status(500).json({
            error: 'No se pudo borrar el producto'
          })
        }
        
        return res.status(204).json({})
      }
     }
module.exports = ProductsController