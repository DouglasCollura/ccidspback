const {models} = require('../libs/sequelize');


class TeacherService {

  async findTeacher(data){
    try {
      const teacher = await models.People.findOne({
        where:{cedula:data},
        include:[
          {
            association:'teacher',
            include:[
              'pnf',
              'trayecto',
              'seccion'
            ]
          },
          'user',
          {
            association:'investigator',
            include:[
              'pnf',
              'trayecto',
              'seccion'
            ]
          }
        ]
      });
      if(!teacher){
        return {type:1,data:null}
      }

      if(teacher.investigator){
        return {type:3,data:teacher}
      }else{
        return {type:2,data:teacher}
      }

    } catch (error) {
      console.error(error)
    }
  }

  async get(){

    const data = await models.Teacher.findAll({
      attributes:['people_id'],
      group:[
        'Teacher.people_id',
      ],

    })

    const res = await models.People.findAll({
      where: {
        id:data.map(e => e.dataValues.people_id)
      },
      include:[
        {
          association:'teacher',
          include:[
            'pnf',
            'trayecto',
            'seccion'
          ]
        }
      ]
    })


    return {data:res}
  }

  async create(data){
    const dataFill = data.filter(e=> e.id == null)
    const res = await models.Teacher.bulkCreate(dataFill)
    return res;
  }

  async store(data){

    res = await models.Teacher.create(data)
    return res;
  }

  async update(id, data) {
    try {
      const inv = await models.Teacher.findByPk(id);
      await inv.update(data);
      return inv;
    } catch (error) {
      console.error(error)
    }
  }



  async delete(data){
    console.log('DATA DELETE',data)
    data.map(async(e)=>{
      const model = await models.Teacher.findByPk(e.id);
      await model.destroy();
    })
    return { rta: true };
  }

}

module.exports = TeacherService;
