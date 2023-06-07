const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class AreaPrioritariaService {

  async get(){
    const {count, rows} = await models.AreaPrioritaria.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }


  async create(data){
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from area_prioritaria where LEVENSHTEIN(name, '${data.name}') < 4
    `)

    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }

    const res = await models.AreaPrioritaria.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.AreaPrioritaria.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.AreaPrioritaria.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = AreaPrioritariaService;
