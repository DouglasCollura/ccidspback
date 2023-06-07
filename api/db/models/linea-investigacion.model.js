const { Model, DataTypes, Sequelize } = require('sequelize')

const LINEA_INVESTIGACION_TABLE = 'linea_investigacion';

const LineaInvestigacionSchema ={
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

class LineaInvestigacion extends Model {
  static associate(models){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: LINEA_INVESTIGACION_TABLE,
      modelName: 'LineaInvestigacion',
      timestamps: false
    }
  }
}


module.exports = { LINEA_INVESTIGACION_TABLE,  LineaInvestigacionSchema, LineaInvestigacion}
