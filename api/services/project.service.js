
const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProjectService {

  async create(data) {
    const project = await models.Project.create(data.project)
    data.students.map(async (e) =>{
      const data = {
        investigatorId: e,
        projectId: project.id
      }
      await models.ProjectStudent.create(data)
    })
    // const res = await models.Project.create(data.project)
    return project;
  }

  async get(id){
    const investigator = await models.Investigator.findOne({
      where:{peopleId:id}
    })

    const projects = await models.ProjectStudent.findAll({
      where:{investigatorId:investigator.id}
    })

    const {count, rows} = await models.Project.findAndCountAll({
      order:[
        ['created_at', 'DESC']
      ],
      include:[
        {
          association:'projectStudent',
          include:[
            {
              association:'investigator',
              include:[
                'people'
              ]
            }

          ]
        },
        'pnf',
        'trayecto',
        'DimensionEspacial',
        'AreaPrioritaria',
        'AcademicYear',
        'LineaInvestigacion',
        'seccion'
      ],
      where: {
        id: {
          [Op.in]: projects.map(obj => obj.projectId)
        }
      }
    })
    return {count, rows}
  }

  async update(id, data) {
    try {
      const inv = await models.Project.findByPk(id);
      await inv.update(data.project);

      await models.ProjectStudent.destroy({
        where:{
          projectId:id
        }
      })

      data.students.map(async (e) =>{
        const data = {
          investigatorId: e,
          projectId: id
        }
        await models.ProjectStudent.create(data)
      })

      return inv;
    } catch (error) {
      console.error(error)
    }
  }

  async changeStatus(id, data){
    const inv = await models.Project.findByPk(id);
    await inv.update(data);
  }
}

module.exports = ProjectService;
