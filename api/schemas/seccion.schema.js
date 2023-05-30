const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const pnfId= Joi.number().integer();
const trayectoId= Joi.number().integer();

const createSeccionSchema = Joi.object({
  name: name.required(),
  pnfId: pnfId.required(),
  trayectoId: trayectoId.required(),
})

const updateSeccionSchema = Joi.object({
  name: name.required(),
  pnfId: pnfId,
  trayectoId: trayectoId,
})
const getSeccionSchema = Joi.object({
  id: id.required(),
  trayectoId: trayectoId.required(),
})


module.exports = { createSeccionSchema, updateSeccionSchema, getSeccionSchema }
