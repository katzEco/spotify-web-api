const session = require('express-session')
const bodyParser = require('body-parser')

async function Middleware(app, exp, root) {
  // app.use(bodyParser.json())
  app.use(bodyParser.text())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use(
    session({
      secret: 'dethzMastery198',
      saveUninitialized: false,
    })
  )

  app.use(exp.static(root + '/statics'))
}

module.exports = Middleware
