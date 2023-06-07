const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createLineaInvestigacionSchema = Joi.object({
  name: name.required(),
})

const updateLineaInvestigacionSchema = Joi.object({
  name: name.required(),
})
const getLineaInvestigacionSchema = Joi.object({
  id: id.required()
})

module.exports = { createLineaInvestigacionSchema, updateLineaInvestigacionSchema, getLineaInvestigacionSchema }
