const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createInvestigatorSchema, getInvestigatorSchema, updateInvestigatorSchema } = require('./../schemas/investigator.schema')
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


router.post('/register', async (request, response, next) => {
  try {
    const body = request.body;
    res = await investigatorService.register(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getInvestigatorSchema, 'params'),
  validatorHandler(updateInvestigatorSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const {id} = request.params;
    res = await investigatorService.update(id, body)
    response.status(200).json({status:'ok',data:res})
  }
)

router.delete('/:id',
  validatorHandler(getInvestigatorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await investigatorService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
