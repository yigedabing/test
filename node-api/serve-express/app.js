const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routers/user-router')
const address = require('address')
const connection = require('./mysql')
const uploadRouter = require('./routers/upload-router')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// 启动express
const startExpress = () => {
  const port = 3000
  const app = express()
  const ip = address.ip()

  // 跨域CORS设置
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*')
  //   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  //   res.header('Access-Control-Allow-Credentials', 'true')
  //   res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Token,admin-Id,ProjectId')
  //   res.header('Access-Control-Expose-Headers', '*')
  //   if (req.method == 'OPTIONS') {
  //     res.send('')
  //     return
  //   }
  //   next()
  // })

  // 中间件
  app.use(
    cors({
      origin: 'http://127.0.0.1:5173',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
      allowedHeaders: 'Content-Type,Access-Token,admin-Id,ProjectId',
      exposedHeaders: '*',
      maxAge: 2 * 60 * 1000,
      credentials: true,
    })
  )
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
