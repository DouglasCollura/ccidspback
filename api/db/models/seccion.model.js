const { Model, DataTypes, Sequelize } = require('sequelize')
const SECCION_TABLE = 'seccion';
const { PNF_TABLE } = require('./pnf.model')

const SeccionSchema ={
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
  pnfId: {
    field: 'pnf_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PNF_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Seccion extends Model {
  static associate(models){
    this.belongsTo(models.Pnf, {as: 'pnf'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: SECCION_TABLE,
      modelName: 'Seccion',
      timestamps: false
    }
  }
}


module.exports = { SECCION_TABLE,  SeccionSchema, Seccion}
