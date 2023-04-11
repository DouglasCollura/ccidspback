const {models} = require('../libs/sequelize');


class InvestigatorService {

  async get(){
    // const [data] = await sequelize.query('select * from users')
    const data = await models.Investigator.findAll({
      include: ['people']
    })
    return data
  }

  async create(data){
    const res = await models.Investigator.create(data,{
      include: ['people']
    })
    return res;
  }

}

module.exports = InvestigatorService;
