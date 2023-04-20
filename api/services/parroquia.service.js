const { Estado } = require('../db/models/estado.model');
const { Municipio } = require('../db/models/municipio.model');
const {models} = require('../libs/sequelize');

class ParroquiaService {

  async get(){
    const {count, rows} = await models.Parroquia.findAndCountAll({
      include: [{model:Municipio, as:'municipio', include:['estado']}],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const res = await models.Parroquia.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Parroquia.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Parroquia.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = ParroquiaService;
