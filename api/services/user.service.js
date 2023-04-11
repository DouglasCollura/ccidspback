const {models} = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom')

class UserService {

  constructor(){
  }

  async get(){
    // const [data] = await sequelize.query('select * from users')
    const data = await models.User.findAll({
      include: ['people']
    })
    return data
  }

  async getOne(id){
    const res = await this.pool.query(`select * from users where id=${id}`)
    return res.rows;
  }

  async findByEmail(email){
    const res = await models.User.findOne({where: {email}});
    return res;
  }

  async create(data){
    const hash = await bcrypt.hash(data.password, 10);

    const res = await models.User.create(
      {
        ...data,
        password:hash
      },
      {include:['people']}
    )
    delete res.dataValues.password;
    return res;
  }

  async update(id, data){
    const user = await models.User.findByPk(id)
    const res = await user.update(data)
    return res;
  }

  delete(){

  }

}


module.exports = UserService;
