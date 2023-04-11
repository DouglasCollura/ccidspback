const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createInvestigatorSchema, getInvestigatorSchema} = require('./../schemas/investigator.schema')
const InvestigatorService = require('./../services/investigator.service')

const router = express.Router();
const investigatorService = new InvestigatorService;



router.get('/', async (request, response, next) => {
  try {
    const users = await investigatorService.get()
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createInvestigatorSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await investigatorService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

module.exports = router;
