import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'
mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected to', MONGO_URL))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = Number(process.env.PORT) || 8000
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`))
