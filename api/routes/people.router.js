const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createPeopleSchema, getPeopleSchema} = require('./../schemas/people.schema')
const PeopleService = require('./../services/people.service')

const router = express.Router();
const peopleService = new PeopleService;


router.get('/', async (request, response, next) => {
  try {
    const {page} = request.query;
    const users = await peopleService.get(page)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createPeopleSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await peopleService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

module.exports = router;
