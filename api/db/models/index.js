const { User, UserSchema } = require('./user.model');
const {People, PeopleSchema} = require('./people.model')
const {Investigator, InvestigatorSchema} = require('./investigator.model')

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  People.init(PeopleSchema, People.config(sequelize))
  Investigator.init(InvestigatorSchema, Investigator.config(sequelize))

  User.associate(sequelize.models);
  Investigator.associate(sequelize.models);
  People.associate(sequelize.models);
}


module.exports = setupModels;
