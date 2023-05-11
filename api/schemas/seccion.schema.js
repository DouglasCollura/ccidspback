const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const pnfId= Joi.number().integer();

const createSeccionSchema = Joi.object({
  name: name.required(),
  pnfId: pnfId.required(),
})

const updateSeccionSchema = Joi.object({
  name: name.required(),
  pnfId: pnfId,
})
const getSeccionSchema = Joi.object({
  id: id.required()
})


module.exports = { createSeccionSchema, updateSeccionSchema, getSeccionSchema }
