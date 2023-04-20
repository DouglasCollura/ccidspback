const {models} = require('../libs/sequelize');


class InvestigatorService {

  async get(){
    // const [data] = await sequelize.query('select * from users')
    const {count, rows} = await models.Investigator.findAndCountAll({
      include: ['people'],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const res = await models.Investigator.create(data,{
      include: ['people']
    })
    return res;
  }

  async update(id, data) {
    try {
      const inv = await models.Investigator.findByPk(id, {include: ['people']});
      await inv.people.update(data?.people);
      await inv.update(data);
      return inv;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id){
    const model = await models.Investigator.findByPk(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = InvestigatorService;