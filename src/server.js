const { app } = require('./utils/app')
const productRouter = require('./routers/productRouter')
const viewsRouter = require('./routers/viewsRouter')
const usersRouter = require('./routers/usersRouter')

app.use('/api/products', productRouter)
app.use('/api/sessions', usersRouter)
app.use('/', viewsRouter)