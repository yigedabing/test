const jsonwebtoken = require('jsonwebtoken')
const secretOrPrivateKey = 'secretOrPrivateKey'

const setToken = async ({ userName, password, projectId }) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign({ userName, password, projectId }, secretOrPrivateKey, { algorithm: 'HS256', expiresIn: '10min' }, (err, token) => {
      if (err) {
        console.log('a', err)
        reject(err)
      }
      resolve(token)
    })
  })
}

const getToken = async (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({ error: 'token 为空' })
    }
    jsonwebtoken.verify(token, secretOrPrivateKey, { algorithms: ['HS256'] }, (err, decode) => {
      if (err) {
        reject(err)
      }
      resolve(decode)
    })
  })
}

module.exports = {
  setToken,
  getToken,
}
