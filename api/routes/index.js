const express = require('express');
const userRouter = require('./users.router')

function routerApp(app){
  const router = express.Router();
  app.use('/api', router)
  router.use('/user', userRouter)
}


module.exports = routerApp
