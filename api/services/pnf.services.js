const sequelize = require('../libs/sequelize');
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

  async getIdByCode(data){
    const {dataValues} = await models.Pnf.findOne({
      where:{code:data},
    })
    return dataValues.id;
  }

  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from pnf where LEVENSHTEIN(name, '${data.name}') < 4
    `)

    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }

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
