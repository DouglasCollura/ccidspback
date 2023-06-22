const {models} = require('../libs/sequelize');


class PeopleService {

  async get(page = 0){
    // const [data] = await sequelize.query('select * from users')
    page > 0 && (page = page-1);
    const data = await models.People.findAll({
      limit:5,
      offset:page*5
    })
    return {data, page}
  }

  async create(data){
      const res = await models.People.create(data)
      return res;

  }

}

module.exports = PeopleService;
