const express = require('express');
const cors = require('cors');
const routerApp = require('./routes')
const { logErrors, errorHandler } = require('./middlewares/error.handler')
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());

routerApp(app);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () =>{
  console.log(`localhost port: ${port}`)
})
