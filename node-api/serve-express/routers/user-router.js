const express = require('express')
const connection = require('../mysql')

const userRouter = express.Router({ caseSensitive: true, strict: true })

// 查询用户列表
userRouter.get('/getUserList', (req, res) => {
  console.log('Access-Token:', req.get('Access-Token'))
  console.log('cookies:', JSON.stringify(req.cookies))
  console.log('headers:', JSON.stringify(res.getHeaders()))
  connection.query('select * from table_user', (err, data) => {
    if (err) {
      res.send({
        code: err.code,
        msg: err,
      })
      return
    }
    // res.setHeader('Set-Cookie', 'use=admin')
    // res.setHeader('Set-Cookie', 'password=123456abc')
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

module.exports = userRouter
