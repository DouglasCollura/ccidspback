const sequelize = require('../libs/sequelize');
const {models} = require('../libs/sequelize');

class SeccionService {

  async get(){
    const {count, rows} = await models.Seccion.findAndCountAll({
      include: ['pnf'],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async getByPnf(id){
    const {count, rows} = await models.Seccion.findAndCountAll({
      where:{pnf_id:id},
      order:[
        ['name', 'ASC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    console.log('data ', data)
    const find = await sequelize.query(`
    select *,
    LEVENSHTEIN(name, '${data.name}') as levenshtein from seccion where LEVENSHTEIN(name, '${data.name}') < 1 and pnf_id = ${data.pnfId}
    `)
    if(find[0].length > 0){
      throw new Error(`Al parecer ${data.name} ya está registrado`)
    }
    const res = await models.Seccion.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const res = await models.Seccion.findByPk(id);
      await res.update(data);
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Seccion.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = SeccionService;
