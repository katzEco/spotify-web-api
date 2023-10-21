async function AuthIn(req, res, sAPI) {
  const scopes = [
    'ugc-image-upload',
    'user-read-recently-played',
    'user-top-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-modify',
    'user-follow-read',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private',
  ]
  var authUrl = sAPI.createAuthorizeURL(scopes)
  res.redirect(authUrl + '&show_dialog=true')
}

async function AuthCallback(req, res, sAPI) {
  const { code } = req.query
  try {
    var data = await sAPI.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body
    sAPI.setAccessToken(access_token)
    sAPI.setRefreshToken(refresh_token)

    req.session.spotifyAccount = { access_token, refresh_token }

    res.redirect('/')
  } catch (err) {
    res.send(`error ${err}`)
  }
}

module.exports = {
  AuthIn,
  AuthCallback,
}
