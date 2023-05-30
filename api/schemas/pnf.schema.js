const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const code = Joi.string();

const createPnfSchema = Joi.object({
  name: name.required(),
  code: name.required(),
})

const updatePnfSchema = Joi.object({
  name: name.required(),
  code: name.required(),
})
const getPnfSchema = Joi.object({
  id: id.required()
})


module.exports = { createPnfSchema, updatePnfSchema, getPnfSchema }
