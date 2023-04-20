const express = require('express');
const userRouter = require('./users.router')
const peopleRouter = require('./people.router')
const investigatorRouter = require('./investigator.router')
const estadoRouter = require('./estado.router')
const municipioRouter = require('./municipio.router')
const parroquiaRouter = require('./parroquia.router')
const authRouter = require('./auth.router')

function routerApp(app){
  const router = express.Router();
  app.use('/api', router)
  router.use('/user', userRouter)
  router.use('/people', peopleRouter)
  router.use('/investigator', investigatorRouter)
  router.use('/estado', estadoRouter)
  router.use('/municipio', municipioRouter)
  router.use('/parroquia', parroquiaRouter)
  router.use('/auth', authRouter)
}


module.exports = routerApp
