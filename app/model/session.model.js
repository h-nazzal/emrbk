module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("sessions", {
      ptId: {
        type: DataTypes.INTEGER,
      },
      ptCode: {
        type: DataTypes.INTEGER,
      },
      StartDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      isDeleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Session;
  };

  /*
  router.post('/addSession', async function (req, res) {
    let startDate = new Date();

    var dt1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1, startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
    var dt2 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());

    dt1 = dt1.toISOString().slice(0, 19).replace('T', ' ');
    dt2 = dt2.toISOString().slice(0, 19).replace('T', ' ');

    let a = db.query('INSERT INTO `sessions` (ptId, userId, startDate,endDate) VALUES  (' + req.body.ptId +
        ',' + req.body.userId + ',' + '"' + dt2 + '"' + ',' + '"' + dt1 + '"' + ')', function (err1, result2) {
            if (err1) {
                console.log(err1)
                res.send(err1)
            } else {

                res.send("1 record inserted")
            }

        });
});

  */