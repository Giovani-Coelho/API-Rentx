import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())

// importa todas as rotas que serao utilizadas
app.use(router)

app.listen(3333, () => console.log('Server is running'))
