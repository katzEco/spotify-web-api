const SpotifyMain = require('./modules/APIs/main')
const sAPI = require('./modules/APIs/client')
const IndexPage = require('./pages/index')
const NoAuth = require('./pages/index_noAuth')

async function Routes(app, root, io) {
  app.get('/', async (req, res) => {
    const token = req.session.spotifyAccount

    if (token === undefined) {
      res.send(NoAuth)
    } else {
      res.send(IndexPage(token['access_token']))
    }
  })

  await SpotifyMain(app, root, io)
}

module.exports = Routes
