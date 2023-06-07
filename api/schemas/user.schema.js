const Joi = require('joi');
const { createPeopleSchema } = require('./people.schema');
const id = Joi.number();
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string().alphanum().min(3).max(20);
const role = Joi.string();
const peopleId = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  people: createPeopleSchema,
  peopleId: peopleId
})

const updateUserSchema = Joi.object({
  email: email,
  password: password
})
const getUserSchema = Joi.object({
  id: id.required()
})


module.exports = { createUserSchema, getUserSchema, updateUserSchema }
