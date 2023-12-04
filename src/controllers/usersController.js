const usersService = require('../services/usersService')

class UsersController {
  constructor () {
    this.service = new usersService()
  }

  getAll (req, res) {
    console.log(this)
    const users = this.service.getAll()

    console.log(users)

    return res.json(users)
  }
 
  get (req, res) {
    const { id } = req.params

    const user = this.service.get(id)

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      })
    }

    return res.json(user)
  }

  create (req, res) {
    const { body } = req
    // const body = req.body

    const newUser = this.service.create(body)

    
    if (!newUser) {
      return res.status(500).json({
        error: 'No se pudo crear el usuario'
      })
    }

    return res.status(201).json(newUser)
  }

  update (req, res) {
    const { id } = req.params
    const { body } = req

    const updatedUser = this.service.update(id, body)

    if (!updatedUser) {
      return res.status(500).json({
        error: 'No se pudo actualizar el usuario'
      })
    }

    return res.json(updatedUser)
  }

  delete (req, res) {
    const { id } = req.params

    const deletedUser = this.service.delete(id)

    if (!deletedUser) {
      return res.status(500).json({
        error: 'No se pudo borrar el usuario'
      })
    }
    
    return res.status(204).json({})
  }

  //PASSPORT
  login (req, res) {
    const { email, password } = req.body //Recuperamos el username y el password para loguearse

    const userLogeedIn = this.service.login(email, password)
    
    return res.json({
      userLogeedIn
    })
  }
 }

module.exports = UsersController