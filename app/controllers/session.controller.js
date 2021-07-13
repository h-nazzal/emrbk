const db = require("../model");
var db2 = require("../dataBase/dataBaseConnection");

const Session = db.session;
const Op = db.Sequelize.Op;
const PT = db.pt;

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.ptCode || !req.body.ptId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    let startDate = new Date();
    var dt1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1, startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
    var dt2 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
    dt1 = dt1.toISOString().slice(0, 19).replace('T', ' ');
    dt2 = dt2.toISOString().slice(0, 19).replace('T', ' ');
    PT.findOne({
        where:{
            id : req.body.ptId,
        }
    }).then(result=>{
        console.log(dt1);
        if(req.body.ptCode ==result.ptCode ){
            var session = {
                ptId: parseInt(req.body.ptId),
                ptCode: parseInt(req.body.ptCode),
                StartDate: dt2,
                endDate: dt1, 
            }
            Session.create(session).then(ress=>{
                res.send({
                    message : "Record has been added successfully"
                });
            }).catch(err=>{
                res.status(500).send({
                    message: err.message || "error in create Session"
                })
            })

        }
        else{
            res.send("patient code is not matching")
        }
  
    }).catch(err=>{
        res.send(err.message || "error in find pt with this id")
    })
   

}


/*
outer.get('/getSessionByDate', async function (req, res) {
    let date = new Date();
    var dt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

    dt = dt.toISOString().slice(0, 19).replace('T', ' ');
    // event_date > date_sub(now(), interval 1 week
    //+' and endDate <= '+'"'+dt+'"'
    //  var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";

    var sql = "SELECT * from `sessions` JOIN Patient on sessions.ptId = Patient.id  where startDate <= " + '"' + dt + '" and endDate >= ' + '"' + dt + '"';
   db.query(sql, function (err, result) {
        if (err) {
            console.log("errorrrrrrrrr:   " , err)
            res.send(err); 
        }
        else {
            
            if (result.length === 0)
                res.send(result);
            else {
                
                res.send(result);
                //var modify = new modifyFunction();
               // modify.getseesion(result).then(rfinal=>{
                    //res.send(rfinal);
                             //   })
            }
        }
    });
*/