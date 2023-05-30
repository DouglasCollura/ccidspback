const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')
const { createTeacherSchema, getTeacherSchema} = require('./../schemas/teacher.schema')
const TeacherService = require('./../services/teacher.service')

const router = express.Router();
const teacherService = new TeacherService;


router.get('/', async (request, response, next) => {
  try {
    const {page} = request.query;
    const users = await teacherService.get(page)
    response.json(users)
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createTeacherSchema, 'body') ,async (request, response, next) => {
  try {
    const body = request.body;
    res = await teacherService.create(body)
    response.status(201).json({status:'ok',data:res})
  } catch (error) {
    next(error);
  }
})

module.exports = router;
