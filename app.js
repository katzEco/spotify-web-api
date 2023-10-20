const exp = require('express')
require('dotenv').config()

const Routes = require('./src/routes')
const Serve = require('./src/serve')

const app = exp()

Routes(app, __dirname)
Serve(app)
