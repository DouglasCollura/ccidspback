const Joi = require('joi');
const { createPeopleSchema, updatePeopleSchema } = require('./people.schema');
const id = Joi.number().integer();
const exp = Joi.string();
const peopleId = Joi.number().integer();

const createInvestigatorSchema = Joi.object({
  exp: exp.required(),
  people: createPeopleSchema
})

const updateInvestigatorSchema = Joi.object({
  exp: exp,
  people: updatePeopleSchema
})
const getInvestigatorSchema = Joi.object({
  id: id.required()
})


module.exports = { createInvestigatorSchema, updateInvestigatorSchema, getInvestigatorSchema }
