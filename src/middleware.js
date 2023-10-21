const session = require('express-session')
const bodyParser = require('body-parser')

async function Middleware(app, exp) {
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
}

module.exports = Middleware
