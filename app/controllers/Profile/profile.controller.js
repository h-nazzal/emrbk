const path = require('path')
const fs = require('fs')
// connect to database
const db = require('../../model')
const User = db.users
const Op = db.Sequelize.Op
exports.uploadPhoto = (req, res) => {
  console.log(req.body)
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
    .then(data => {
      console.log(' second step', req.imageString)
      if (
        fs.existsSync(
          path.join(__dirname, '../../../public/images/' + data.image)
        )
      ) {
        // fs.unlinkSync( path.join(__dirname, '../../../public/images/' + data.image)
        console.log('enable unlink in profile control')
      }

      User.update(
        {
          image: req.imageString
        },
        {
          where: {
            id: data.id
          }
        }
      )
        .then(result => {
          console.log('the string', req.imageString)
          res.send({ imgPath: req.imageString })
        })
        .catch(err => {
          res.send('error in update')
        })
    })
    .catch(err => {
      console.log(err)
      res.send('erro in find match')
    })
}

exports.getUser = (req, res) => {
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'error in get user info'
      })
    })
}
