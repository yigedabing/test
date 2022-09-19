const userRouter = require('./routers/user-router')
const uploadRouter = require('./routers/upload-router')

module.exports = function registerRouter(app) {
  app.use('/api/v1', userRouter)
  app.use('/api/v1', uploadRouter)
}
