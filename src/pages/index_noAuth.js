const NoAuth = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>katz Player</title>

  <link rel="stylesheet" href="/css/index.auth.css">
</head>
<body>
  <div class="container">
    <button onclick="Login()">
      Login
    </button>
  </div>

  <script>
    function Login() {
      window.location.replace('/api/auth/login')
    }
  </script>
</body>
</html>`

module.exports = NoAuth
