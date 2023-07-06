const { where } = require('sequelize');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');


class InvestigatorService {

  async get() {
    // const [data] = await sequelize.query('select * from users')
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: ['people', 'pnf', 'seccion', 'trayecto'],
      order: [
        ['created_at', 'DESC']
      ]
    })
    return { total: count, data: rows }
  }

  async getList(data) {
    // const [data] = await sequelize.query('select * from users')
    const { count, rows } = await models.Investigator.findAndCountAll({
      include: ['people', 'pnf', 'seccion', 'trayecto'],
      order: [
        ['created_at', 'DESC']
      ],
      where:[
        {pnf_id:data?.pnfId},
        {trayecto_id:data?.trayectoId},
        {seccion_id:data?.seccionId},
      ]
    })
    return { total: count, data: rows }
  }

  async create(data) {
    try {

      const res = await models.Investigator.create(data, {
        include: ['people']
      })

      return res;
    } catch (error) {
      throw new Error(error)

    }
  }

  async register(data) {
    // const res = await models.Investigator.create(data)
    // data.user.peopleId = res.peopleId;
    const hash = await bcrypt.hash(data.user.password, 10);
    const user = await models.User.create({
      ...data.user,
      password: hash
    },)
    return user;
  }


  async update(id, data) {
    try {
      const inv = await models.Investigator.findByPk(id, { include: ['people'] });
      await inv.people.update(data?.people);
      await inv.update(data);
      return inv;
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id) {
    const model = await models.Investigator.findByPk(id);
    await model.destroy({
      include:['people']
    });
    return { rta: true };
  }

}

module.exports = InvestigatorService;
