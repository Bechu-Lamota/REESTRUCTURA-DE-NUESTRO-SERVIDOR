const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passport = require('passport')
const { Server } = require('socket.io')
const initializePassport = require('../config/passport.config')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//configuración handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
  
app.use(flash())
app.use(cookieParser('secretCookie'))
initializePassport()
app.use(passport.initialize())


const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

const io = new Server(httpServer)
const users = []
const messages = []

io.on('connection', socket => {
  console.log('Nuevo cliente conectado')

  socket.on('joinChat', username => {
    users.push({
      name: username,
      socketId: socket.id
    })

    socket.broadcast.emit('notification', `${username} se ha unido al chat`)

    socket.emit('notification', `Bienvenid@ ${username}`)
    socket.emit('messages', JSON.stringify(messages))
  })

  socket.on('newMessage', message => {
    const user = users.find(user => user.socketId === socket.id)

    const newMessage = {
      message,
      user: user.name
    }
    messages.push(newMessage)

    io.emit('message', JSON.stringify(newMessage))
  }) 
})

app.get('/', (req, res) => {
  res.json({
      status: 'running', 
      date: new Date()
  })
})

//commander & dotenv & singleton
const DB = require('../db/singleton')
const settings = require('../command/commander')
DB.getConnection(settings)


module.exports = {
  app,
  io
}
