const UsersManager = require('../managers/usersManager')
const { generateToken } = require('../utils/jwt')
const { createHash, isValidPassword } = require('../utils/passwordHash')

class UsersService {
  constructor () {
    this.storage = new UsersManager()
  }

  getAll () {
    return this.storage.getAll()
  }

  get (id) {
    return this.storage.get(id)
  }

  create (body) {
    body.password = this.createHash(body.password)
    return this.storage.create(body)
  }

  update (id, body) {
    return this.storage.update(id, body)
  }

  delete (id) {
    return this.storage.delete(id)
  }

  //JWT
  //Una vez que verificamos que todo funciona bien agregamos el token
  login (email, password) {
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
/*
localhost:8080/api/users/login POST en postman
{
  "email": "iram@mail.com",
  "password": "qwerty"
}
*/
}

module.exports = UsersService