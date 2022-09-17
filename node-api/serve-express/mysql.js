const mysql = require('mysql')

// 启动数据库连接
const connection = mysql.createConnection({
  user: 'root',
  password: '1234567890a',
  database: 'demo',
})

module.exports = connection
