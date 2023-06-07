const { Model, DataTypes, Sequelize } = require('sequelize')

const DIMENSION_ESPACIAL_TABLE = 'dimension_espacial';

const DimensionEspacialSchema ={
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

class DimensionEspacial extends Model {
  static associate(models){
    // this.hasMany(models.SujetoSocial,{
    //   as:'sujetoSocial',
    //   foreignKey:'sujetoSocialId'
    // })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: DIMENSION_ESPACIAL_TABLE,
      modelName: 'DimensionEspacial',
      timestamps: false
    }
  }
}


module.exports = { DIMENSION_ESPACIAL_TABLE,  DimensionEspacialSchema, DimensionEspacial}
