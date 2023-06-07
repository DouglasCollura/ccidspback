const Joi = require('joi');
const { createPeopleSchema, updatePeopleSchema } = require('./people.schema');
const { createUserSchema } = require('./user.schema');
const id = Joi.number().integer();
const exp = Joi.string();
const trayectoId = Joi.number().integer();
const pnfId = Joi.number().integer();
const seccionId = Joi.number().integer();
const peopleId = Joi.number().integer();

const createInvestigatorSchema = Joi.object({
  exp: exp,
  trayectoId: trayectoId.required(),
  pnfId: pnfId.required(),
  seccionId: seccionId.required(),
  people: createPeopleSchema
})

const registerInvestigatorSchema = Joi.object({
  exp: exp,
  trayectoId: trayectoId.required(),
  pnfId: pnfId.required(),
  seccionId: seccionId.required(),
  people: createPeopleSchema,
  user: createUserSchema
})

const updateInvestigatorSchema = Joi.object({
  exp: exp,
  trayectoId: trayectoId.required(),
  pnfId: pnfId.required(),
  seccionId: seccionId.required(),
  people: updatePeopleSchema
})
const getInvestigatorSchema = Joi.object({
  id: id.required()
})


module.exports = { createInvestigatorSchema, updateInvestigatorSchema, getInvestigatorSchema, registerInvestigatorSchema }
