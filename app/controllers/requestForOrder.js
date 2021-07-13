const express = require('express')
const router = express.Router()
const db = require('../model')

const LabOrder = db.labOrder
const RadioOrder = db.radioOrder
const pathoOrder = db.pathobOrder
var db2 = require('../dataBase/dataBaseConnection')

class requstss {
  //labs
  addOrder = async req => {
    var j, m
    console.log(req)
    j = await Doctor.findOne({
      where: {
        userId: req.drId
      }
    }).then(result => {
      let docId = result.dataValues.id
      m = new Promise((resolve, reject) => {
        const laborder = {
          status: 'req.status',
          ptId: parseInt(req.ptId),
          Date: req.date,
          drId: parseInt(docId),
          comments: req.comments,
          result: null,
          labId: parseInt(req.labId),
          labFDId: null
        }
        LabOrder.create(laborder)
          .then(data => {
            resolve(true)
          })
          .catch(err => {
            resolve(err.message)
          })
      })
    })

    return m
  }

  addOrder2 = async req => {
    var j, m
    console.log(req)
    j = await Doctor.findOne({
      where: {
        userId: req.drId
      }
    }).then(result => {
      let docId = result.dataValues.id
      m = new Promise((resolve, reject) => {
        const radioOrder = {
          status: 'qq',
          ptId: parseInt(req.ptId),
          Date: req.date,
          radioId: parseInt(req.radioId),
          drId: parseInt(docId),
          comments: req.comments,
          result: null,
          radioFDId: null
        }
        console.log('==============================================')
        console.log(radioOrder)
        RadioOrder.create(radioOrder)
          .then(data => {
            resolve(true)
          })
          .catch(err => {
            resolve(err.message)
          })
      })
    })

    return m
  }
  addOrder3 = async req => {
    var j, m
    console.log(req)
    j = await Doctor.findOne({
      where: {
        userId: req.drId
      }
    }).then(result => {
      let docId = result.dataValues.id
      m = new Promise((resolve, reject) => {
        const pathoorder = {
          status: 'req.status',
          pathoId: parseInt(req.pathoId),
          ptId: parseInt(req.ptId),
          Date: req.date,
          drId: parseInt(docId),
          comments: req.comments,
          result: null,
          labFDId: null
        }
        console.log('==============================================')
        console.log(pathoorder)
        console.log(req)
        pathoOrder
          .create(pathoorder)
          .then(data => {
            resolve(true)
          })
          .catch(err => {
            resolve(err.message)
          })
      })
    })

    return m
  }
  // radio
  // addOrder2 = req => {
  //   return new Promise((resolve, reject) => {

  //   })
  // }
  // // patho
  // addOrder3 = req => {
  //   return new Promise((resolve, reject) => {

  //   })
  // }
}
module.exports = requstss
