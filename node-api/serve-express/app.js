const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routers/user-router')
const address = require('address')
const connection = require('./mysql')
const uploadRouter = require('./routers/upload-router')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const rid = require('connect-rid')

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
      preflightContinue: false,
      optionsSuccessStatus: 204,
      allowedHeaders: 'Access-Token,admin-Id,ProjectId,X-Request-Id',
      exposedHeaders: '*',
      maxAge: 2 * 60 * 1000,
      credentials: true,
    })
  )

  app.use(rid())

  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // 静态服务目录
  app.use('/static', express.static(path.join(process.cwd(), 'node-api', 'public')))

  app.listen(port, ip, () => {
    console.log(`api baseURl: http://${ip}:${port}/`)
  })

  app.get('/', (req, res) => {
    res.send(`<h2>hello, express</h2>`)
  })

  app.use('/api/v1', userRouter)
  app.use('/api/v1', uploadRouter)
}

connection.connect((err) => {
  if (err) throw err
  startExpress()
})
