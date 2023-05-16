const {models} = require('../libs/sequelize');


class ImportService {

  async create(data){
    try {
      const res = await models.Investigator.bulkCreate(data,{
        include:['people']
      })
      return res;
    } catch (error) {
      return error
    }

  }


}

module.exports = ImportService;
