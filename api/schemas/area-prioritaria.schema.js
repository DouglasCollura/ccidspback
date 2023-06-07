const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createAreaPrioritariaSchema = Joi.object({
  name: name.required(),
})

const updateAreaPrioritariaSchema = Joi.object({
  name: name.required(),
})
const getAreaPrioritariaSchema = Joi.object({
  id: id.required()
})


module.exports = { createAreaPrioritariaSchema, updateAreaPrioritariaSchema, getAreaPrioritariaSchema }
