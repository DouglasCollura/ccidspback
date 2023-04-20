const { User, UserSchema } = require('./user.model');
const {People, PeopleSchema} = require('./people.model')
const {Investigator, InvestigatorSchema} = require('./investigator.model')
const {Estado, StateSchema} = require('./estado.model')
const {Municipio, MunicipioSchema} = require('./municipio.model')
const {Parroquia, ParroquiaSchema} = require('./parroquia.model')

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  People.init(PeopleSchema, People.config(sequelize))
  Investigator.init(InvestigatorSchema, Investigator.config(sequelize))
  Estado.init(StateSchema, Estado.config(sequelize))
  Municipio.init(MunicipioSchema, Municipio.config(sequelize))
  Parroquia.init(ParroquiaSchema, Parroquia.config(sequelize))

  User.associate(sequelize.models);
  Investigator.associate(sequelize.models);
  People.associate(sequelize.models);

  Municipio.associate(sequelize.models);
  Parroquia.associate(sequelize.models);
}


module.exports = setupModels;
