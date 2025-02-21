const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Iai essa galera')
})

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`)
})