const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();



app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//call the db
const db = require("./app/model");
const TutorialController = require("./app/controllers/tutorial.controller");
//const TagController = require("./app/controllers/tutorial.controller");



// db.sequelize.sync();
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TeckTeam application." });
});


require("./app/routes/turorial.routes")(app);
require("./app/routes/tag.routes")(app);
require("./app/routes/types/allergy.route")(app);
require("./app/routes/types/disease.route")(app);
require("./app/routes/types/drug.route")(app);
require("./app/routes/types/labs.route")(app);
require("./app/routes/types/patho.route")(app);
require("./app/routes/types/radio.route")(app);
require("./app/routes/types/surgery.route")(app);
require("./app/routes/employees/doctor.route")(app);
require("./app/routes/employees/nurse.route")(app);
require("./app/routes/employees/chemis.route")(app);
require("./app/routes/employees/assistant.route")(app);
require("./app/routes/employees/patholigist.route")(app);
require("./app/routes/employees/radiogist.route")(app);
require("./app/routes/employees/drFrontDisk.route")(app);
require("./app/routes/employees/labFD.route")(app);
require("./app/routes/orders/order.route")(app);
require("./app/routes/patient.route")(app);
require("./app/routes/appointment.route")(app);
require("./app/routes/auth/auth")(app);
require("./app/routes/profile.route")(app);
require("./app/routes/visit.route")(app);
require("./app/routes/sessions.route")(app);
require("./app/routes/employees/pharmicist.route")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});