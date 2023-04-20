const {models} = require('../libs/sequelize');

class EstadoService {

  async get(){
    const {count, rows} = await models.Estado.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const res = await models.Estado.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Estado.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Estado.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = EstadoService;
