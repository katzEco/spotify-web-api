const NoAuth = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>katz Player</title>

  <style>
    @import url(https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Thai:100,200,300,regular,500,600,700);

    * {
      font-family: 'IBM Plex Sans Thai', sans-serif;
      transition: all .3s;
    }

    body {
      padding: 0;
      margin: 0;
      background: #2e2f2f;
    }

    .container {
      width: 100%;
      height: 100vh;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .container button {
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 10px;
      color: whitesmoke;
      background: #1ed760;
      font-size: 20px;
    }

    .container button:hover {
      opacity: .6;
      cursor: pointer;
      border-radius: 1rem;
      transform: scale(0.85);
    }
  </style>
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
