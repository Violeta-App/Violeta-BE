import express from 'express'
import occurrencesRoutes from './routes/occurrencesRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' with { type: "json" };
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Iai essa galera')
})

app.use('/occurrences', occurrencesRoutes)
app.use('/users', usersRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`)
})