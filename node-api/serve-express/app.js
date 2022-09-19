const express = require('express')
const bodyParser = require('body-parser')
const address = require('address')
const connection = require('./mysql')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { expressjwt } = require('express-jwt')
const rid = require('connect-rid')
const registerRouter = require('./registerRouter')

// 启动express
const startExpress = () => {
  const port = 5173
  const app = express()
  const ip = address.ip()

  // 中间件
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflightContinue: true,
      optionsSuccessStatus: 204,
      allowedHeaders: 'Access-Token,admin-Id,ProjectId,X-Request-Id,Content-Type,Authorization',
      exposedHeaders: '*',
      maxAge: 2 * 60 * 1000,
      credentials: true,
    })
  )

  app.use(rid())
  app.use(
    expressjwt({
      secret: 'secretOrPrivateKey',
      algorithms: ['HS256'],
    }).unless({ path: ['/api/v1/auth/login'] })
  )

  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

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

  // 静态服务目录
  app.use('/static', express.static(path.join(process.cwd(), 'node-api', 'public')))

  app.listen(port, ip, () => {
    console.log(`api baseURl: http://${ip}:${port}/`)
  })

  app.get('/', (req, res) => {
    res.send(`<h2>hello, express</h2>`)
  })

  registerRouter(app)
}

connection.connect((err) => {
  if (err) throw err
  startExpress()
})
