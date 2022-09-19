const express = require('express')
const connection = require('../mysql')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')

const uploadRouter = express.Router({ caseSensitive: true, strict: true })

const staticPath = path.join(process.cwd(), 'node-api', 'public')

// 上传图片
uploadRouter.post('/upload/images', (req, res) => {
  const form = new multiparty.Form()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err
    }
    const file = files.file[0]
    fs.readFile(file.path, (err, data) => {
      if (err) throw new Error('readFile error', { cause: err })
      fs.writeFile(`${staticPath}/images/${file.originalFilename}`, data, (err) => {
        if (err) throw new Error('writeFile error', { cause: err })
        res.send({
          code: 200,
          data: `${req.protocol}://${req.get('Host')}/static/images/${file.originalFilename}`,
          msg: 'success',
        })
        fs.unlink(file.path, (err) => {
          if (!err) {
            console.log(`delete disk file: `, file.path)
          }
        })
      })
    })
  })
})

module.exports = uploadRouter
