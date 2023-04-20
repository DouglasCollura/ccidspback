const {models} = require('../libs/sequelize');

class MunicipioService {

  async get(){
    const {count, rows} = await models.Municipio.findAndCountAll({
      include: ['estado'],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async getByState(id){
    const {count, rows} = await models.Municipio.findAndCountAll({
      where:{estado_id:id},
      order:[
        ['name', 'ASC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const res = await models.Municipio.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Municipio.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Municipio.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = MunicipioService;
