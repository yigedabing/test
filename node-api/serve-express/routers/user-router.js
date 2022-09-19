const express = require('express')
const connection = require('../mysql')
const { setToken } = require('../token')

const userRouter = express.Router({ caseSensitive: true, strict: true })

// 查询用户列表
userRouter.get('/getUserList', (req, res) => {
  req.setTimeout(1 * 60 * 1000)
  res.cookie('rememberMe', '1', { expires: new Date(Date.now() + 1 * 60 * 1000), httpOnly: true })
  connection.query('select * from table_user', (err, data) => {
    if (err) {
      res.send({
        code: err.code,
        msg: err,
      })
      return
    }
    res.send({
      code: 200,
      data: data,
      msg: '操作成功',
    })
  })
})

// 新增
userRouter.post('/addUserInfo', (req, res) => {
  const body = req.body
  connection.query('insert into table_user(user_id,name,age) values(?,?,?)', [body.userId, body.name, body.age], (err, data) => {
    if (err) {
      res.send({
        code: err.code,
        msg: err,
      })
    } else {
      res.send({
        code: 200,
        data: null,
        msg: '添加用户数据成功',
      })
    }
  })
})

userRouter.delete('/deleteUserById/:id', (req, res) => {
  const params = req.params
  connection.query(`delete from table_user where id=${params.id}`, (err, data) => {
    if (err) {
      res.send({
        code: err.code,
        msg: err,
      })
    } else {
      res.send({
        code: 200,
        data: null,
        msg: '删除用户数据成功',
      })
    }
  })
})

userRouter.post('/updateUserInfo', (req, res) => {
  console.log(req.body)
  res.send('更新用户信息')
})

userRouter.post('/auth/login', async (req, res) => {
  const body = req.body
  try {
    const token = await setToken({ userName: body.userName, password: body.password, projectId: body.projectId })
    res.send({
      code: 200,
      data: {
        ...body,
        token,
      },
      msg: 'success',
    })
  } catch (error) {
    res.send({
      code: -1,
      data: null,
      msg: error,
    })
  }
})

module.exports = userRouter
