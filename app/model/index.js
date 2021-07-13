const dbConfig = require('../../db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

sequelize.options.logging = false
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//types
db.allergy = require('./types.models/allergy.model')(sequelize, Sequelize)
db.diseases = require('./types.models/diseases.model')(sequelize, Sequelize)
db.drug = require('./types.models/drug.model')(sequelize, Sequelize)
db.labs = require('./types.models/lab.model')(sequelize, Sequelize)
db.patho = require('./types.models/patho.model')(sequelize, Sequelize)
db.radio = require('./types.models/radio.model')(sequelize, Sequelize)
db.surgy = require('./types.models/surgerie.model')(sequelize, Sequelize)

//employees

db.doctor = require('./employees.model/Doctor.model')(sequelize, Sequelize)
db.nurse = require('./employees.model/nures.model')(sequelize, Sequelize)
db.chemist = require('./employees.model/chemist.model')(sequelize, Sequelize)
db.assistant = require('./employees.model/assistant.model')(
  sequelize,
  Sequelize
)
db.radiogist = require('./employees.model/radiogist.model')(
  sequelize,
  Sequelize
)
db.patholigist = require('./employees.model/patholigist.model')(
  sequelize,
  Sequelize
)
db.pharmacist = require('./employees.model/pharmacist')(sequelize, Sequelize)

//employess (FrontDisk)
db.doctorFD = require('./employees.model/frontDisk.model/DoctorFrontDisk.model')(
  sequelize,
  Sequelize
)
db.labFD = require('./employees.model/frontDisk.model/labFD,model')(
  sequelize,
  Sequelize
)
db.pathoFD = require('./employees.model/frontDisk.model/pathoFD.model')(
  sequelize,
  Sequelize
)
db.radioFD = require('./employees.model/frontDisk.model/radioFd.model')(
  sequelize,
  Sequelize
)

//orders
db.labOrder = require('./orders.model/labOrder.model')(sequelize, Sequelize)
db.radioOrder = require('./orders.model/radioOrder.model')(sequelize, Sequelize)
db.pathobOrder = require('./orders.model/pathoOrder.model')(
  sequelize,
  Sequelize
)

//patient
db.pt = require('./Patient.model/Patient.model')(sequelize, Sequelize)
db.ptProblem = require('./Patient.model/pt_problems.model')(
  sequelize,
  Sequelize
)
db.ptAllergy = require('./Patient.model/pt_allergy.model')(sequelize, Sequelize)
db.ptSurgery = require('./Patient.model/pt_surgery_history.model')(
  sequelize,
  Sequelize
)
db.familyHistory = require('./Patient.model/pt_familyHistory.model')(
  sequelize,
  Sequelize
)
db.inverven = require('./Patient.model/pt_Interventions.model')(
  sequelize,
  Sequelize
)

//Session
db.session = require('./session.model')(sequelize, Sequelize)
db.session = require('./session.model')(sequelize, Sequelize)
db.Prescription = require('./Prescription.model')(sequelize, Sequelize)
db.Prescription_Drugs = require('./Prescription_Drugs.model')(
  sequelize,
  Sequelize
)

//nurseModule
db.nurseModule = require('./NurseModule.model')(sequelize, Sequelize)

//appoinment
db.appoinment = require('./appointment.model')(sequelize, Sequelize)

db.permission = require('./employees.model/rolus.model')(sequelize, Sequelize)

db.users = require('./users.model.js')(sequelize, Sequelize)

db.visit = require('./visit.model')(sequelize, Sequelize)

db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize)

db.tag = require('./tag.model')(sequelize, Sequelize)
sequelize.options.logging = false
module.exports = db
