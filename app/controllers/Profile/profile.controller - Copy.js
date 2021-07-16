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
      if (
        fs.existsSync(
          path.join(__dirname, '../../../public/images/' + data.image)
        )
      ) {
        fs.unlinkSync(
          path.join(__dirname, '../../../public/images/' + data.image)
        )
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
          res.send({ imgPath: req.imageString })
        })
        .catch(err => {
          res.send('error in update')
        })
    })
    .catch(err => {
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
