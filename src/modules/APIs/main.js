const { AuthIn, AuthCallback } = require('./auth')
const sAPI = require('./client')

async function SpotifyMain(app) {
  // Auth
  app.get('/api/auth/login', async (req, res) => {
    await AuthIn(req, res, sAPI)
  })

  app.get('/api/auth/callback', async (req, res) => {
    await AuthCallback(req, res, sAPI)
  })

  app.get('/api/auth/logout', async (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })
}

module.exports = SpotifyMain
