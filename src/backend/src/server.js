import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import apiRoutes from './routes/index.js'
import loginRoutes from './routes/login.js'
import { sequelize } from './models/index.js'
import { seedCatalogos } from './database/seed.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Configuración de EJS y archivos estáticos
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

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
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce tu token JWT en este formato: Bearer <token>'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [path.join(__dirname, './routes/*.js')]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Seguridad: Helmet y Rate Limiter
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      formAction: ["'self'", process.env.FRONTEND_URL || "http://localhost:5173"],
    },
  },
}))

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: { error: 'Demasiadas peticiones desde esta IP. Por favor, intente de nuevo en 15 minutos.' }
})

app.use(cors())
app.use(express.json())

// Aplicar limitador de velocidad a todas las rutas de API y Login
app.use('/api', apiLimiter)
app.use('/login', apiLimiter)

app.use('/api', apiRoutes)
app.use('/login', loginRoutes)

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
