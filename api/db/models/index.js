const { User, UserSchema } = require('./user.model');
const {People, PeopleSchema} = require('./people.model')
const {Investigator, InvestigatorSchema} = require('./investigator.model')
const {Estado, StateSchema} = require('./estado.model')
const {Municipio, MunicipioSchema} = require('./municipio.model')
const {Parroquia, ParroquiaSchema} = require('./parroquia.model')
const {Pnf, PnfSchema} = require('./pnf.model')
const {Trayecto, TrayectoSchema} = require('./trayecto.model')
const {Seccion, SeccionSchema} = require('./seccion.model')
const {Teacher, TeacherSchema} = require('./teacher.model')

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  People.init(PeopleSchema, People.config(sequelize))
  Investigator.init(InvestigatorSchema, Investigator.config(sequelize))
  Estado.init(StateSchema, Estado.config(sequelize))
  Municipio.init(MunicipioSchema, Municipio.config(sequelize))
  Parroquia.init(ParroquiaSchema, Parroquia.config(sequelize))
  Pnf.init(PnfSchema, Pnf.config(sequelize))
  Trayecto.init(TrayectoSchema, Trayecto.config(sequelize))
  Seccion.init(SeccionSchema, Seccion.config(sequelize))
  Teacher.init(TeacherSchema, Teacher.config(sequelize))

  User.associate(sequelize.models);
  Investigator.associate(sequelize.models);
  People.associate(sequelize.models);
  Seccion.associate(sequelize.models);
  Pnf.associate(sequelize.models);
  Municipio.associate(sequelize.models);
  Parroquia.associate(sequelize.models);
  Teacher.associate(sequelize.models);
}


module.exports = setupModels;
