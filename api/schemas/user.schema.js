const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(20);
const lastname = Joi.string().alphanum().min(3).max(20);

const createUserSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required()
})


const getUserSchema = Joi.object({
  id: id.required()
})


module.exports = { createUserSchema, getUserSchema }
