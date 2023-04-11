const { Model, DataTypes, Sequelize } = require('sequelize')
const { PEOPLE_TABLE } = require('./people.model')
const INVESTIGATOR_TABLE = 'investigator';


const InvestigatorSchema ={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  exp: {
    allowNull: false,
    type: DataTypes.STRING
  },
  peopleId: {
    field: 'people_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PEOPLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Investigator extends Model {
  static associate(models){
    this.belongsTo(models.People, {as: 'people'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: INVESTIGATOR_TABLE,
      modelName: 'Investigator',
      timestamps: false
    }
  }
}

module.exports = { INVESTIGATOR_TABLE,  InvestigatorSchema, Investigator}
