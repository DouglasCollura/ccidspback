const express = require('express');
const cors = require('cors');
const passport = require('passport')
const routerApp = require('./routes')
const { logErrors, errorHandler } = require('./middlewares/error.handler')
const { checkApiKey } = require('./middlewares/auth.handler')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

require('./utils/auth')

app.get('/api', checkApiKey,(req, res) =>{
  res.send("server express")
})
app.use(passport.initialize({ session: false }));
routerApp(app);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () =>{
  console.log(`localhost port: ${port}`)
})
