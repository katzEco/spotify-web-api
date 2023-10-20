async function Routes(app, root) {
  app.get('/', (req, res) => {
    res.send('spawned')
  })
}

module.exports = Routes
