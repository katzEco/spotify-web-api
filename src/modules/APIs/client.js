const SpotifyWebApi = require('spotify-web-api-node')

const sAPI = new SpotifyWebApi({
  clientId: process.env.clientID,
  clientSecret: process.env.clientSecret,
  redirectUri: process.env.redirect_uri,
})

module.exports = sAPI
