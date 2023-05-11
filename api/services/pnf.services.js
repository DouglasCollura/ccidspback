const {models} = require('../libs/sequelize');

class PnfService {

  async get(){
    const {count, rows} = await models.Pnf.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const res = await models.Pnf.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Pnf.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Pnf.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = PnfService;
