const db = require("../../model");
const PT = db.pt;
const History = db.ptProblem;
const Allergy = db.ptAllergy;
const Surgey = db.ptSurgery;
const Family = db.familyHistory;
const Invest = db.inverven;
const USER = db.users
const Op = db.Sequelize.Op;

exports.findPt = (req, res) => {
    PT.findAll({
        where: {
            isDeleted: false,
            id:req.body.id,
        }
    }).then(date=>{
        res.send(date)
    }).catch(err=>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving ."
        });
    })
}