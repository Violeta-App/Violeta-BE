import express from 'express'
import ocurrencesRoutes from './routes/ocurrencesRoutes.js'
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Iai essa galera')
})

app.use('/ocurrences', ocurrencesRoutes)

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`)
})