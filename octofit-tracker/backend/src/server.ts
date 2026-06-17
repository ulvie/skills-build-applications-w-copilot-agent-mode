import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const app = express()
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'
mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected to', MONGO_URL))
  .catch(err => console.error('MongoDB connection error:', err))

// Codespaces-aware API URL support
const PORT = Number(process.env.PORT) || 8000
let API_URL = `http://localhost:${PORT}`
if (process.env.CODESPACE_NAME) {
  // Construct a Codespaces preview URL that uses the codespace name and port.
  // Pattern used here is <codespace>-<port>.preview.app.github.dev which works with GitHub Codespaces forwarded ports.
  API_URL = `https://${process.env.CODESPACE_NAME}-${PORT}.preview.app.github.dev`
}
console.log('API base URL:', API_URL)

// Basic CORS handling to allow Codespaces frontend preview to call this API when needed
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && (origin.includes('preview.app.github.dev') || origin.includes('localhost'))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.get('/', (req, res) => {
  res.json({ status: 'ok', apiUrl: API_URL })
})

// Mount API routes
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`))
