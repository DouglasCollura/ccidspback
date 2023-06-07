const { Model, DataTypes, Sequelize } = require('sequelize')

const AREA_PRIORITARIA_TABLE = 'area_prioritaria';

const AreaPrioritariaSchema ={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class AreaPrioritaria extends Model {
  static associate(models){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: AREA_PRIORITARIA_TABLE,
      modelName: 'AreaPrioritaria',
      timestamps: false
    }
  }
}


module.exports = { AREA_PRIORITARIA_TABLE,  AreaPrioritariaSchema, AreaPrioritaria}
