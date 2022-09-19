const userRouter = require('./routers/user-router')
const uploadRouter = require('./routers/upload-router')
const { expressjwt } = require('express-jwt')

module.exports = function registerRouter(app) {
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({
        code: 401,
        data: err,
        msg: 'success',
      })
    } else {
      next(err)
    }
  })

  app.use(
    expressjwt({
      secret: 'secretOrPrivateKey',
      algorithms: ['HS256'],
    }).unless({ path: ['/api/v1/auth/login'] })
  )
  app.use('/api/v1', userRouter)
  app.use('/api/v1', uploadRouter)
}
