const {models} = require('../libs/sequelize');


class TeacherService {

  async get(){
    // const [data] = await sequelize.query('select * from users')
    const {count, rows} = await models.User.findAndCountAll({
      where:{role:'teacher'},
      attributes: {exclude: ['password']},
      include: [{association:'people',
        include:[{
          association:'teacher',
          include:[
            'pnf', 'trayecto','seccion'
          ]
        }]
      }],
      order:[
        ['created_at', 'DESC']
      ]
    })
    return {total:count, data:rows}
  }

  async create(data){
    const res = await models.Teacher.bulkCreate(data)
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

module.exports = TeacherService;
