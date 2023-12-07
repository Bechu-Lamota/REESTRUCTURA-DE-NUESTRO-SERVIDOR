const UsersMemory = require('../storage/usersMemory')
const { generateToken } = require('../../utils/jwt')
const { isValidPassword } = require('../../utils/passwordHash')

class UsersService {
  constructor () {
    this.storage = new UsersMemory()
  }

  getUsers () {
    return this.storage.getUsers()
  }

  getUserById (id) {
    return this.storage.getUserById(id)
  }

  addUser (body) {
    body.password = this.createHash(body.password)
    return this.storage.create(body)
  }

  updateUser (id, body) {
    return this.storage.updateUser(id, body)
  }

  deleteUser (id) {
    return this.storage.deleteUser(id)
  }

  loginUser (email, password) {
    const user = this.storage.getByEmail(email)
    if (!user) {
      return false
    }

    if(!isValidPassword(password, user.password)) {
      return false
    }

    const token = generateToken({
      userId: userid,
      role: user.role
    })

    delete user.password
    user.token = token

    return user
  }
  
}

module.exports = UsersService