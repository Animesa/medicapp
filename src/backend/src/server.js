import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import apiRoutes from './routes/index.js'
import { sequelize } from './models/index.js'
import { seedCatalogos } from './database/seed.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MedicAPP API',
      version: '1.0.0',
      description: 'Documentación de la API REST de MedicAPP'
    },
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ],
    tags: [
      {
        name: 'Pacientes',
        description: 'Permite la gestión de pacientes'
      },
      {
        name: 'Medicos',
        description: 'Permite la gestión de médicos'
      },
      {
        name: 'Citas',
        description: 'Permite la gestión de citas'
      },
      {
        name: 'Epicrisis',
        description: 'Permite la gestión de eventos clínicos (epicrisis)'
      },
      {
        name: 'Catalogos',
        description: 'Permite la gestión de catálogos'
      }
    ]
  },
  apis: [path.join(__dirname, './routes/*.js')]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.use(cors())
app.use(express.json())
app.use('/api', apiRoutes)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

sequelize.sync({ force: false }).then(async () => {
  console.log('Base de datos sincronizada')
  await seedCatalogos()
  console.log('Catálogos insertados correctamente.')
  app.listen(port, () => {
    console.log(`Backend ejecutándose en http://localhost:${port}`)
    console.log(`Swagger UI disponible en http://localhost:${port}/`)
  })
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err)
})
