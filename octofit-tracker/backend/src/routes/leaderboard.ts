import { Router } from 'express'
import Leaderboard from '../models/leaderboard.js'

const router = Router()

router.get('/', async (req, res) => {
  const rows = await Leaderboard.find().populate('user').sort({ score: -1 }).limit(100).lean()
  res.json(rows)
})

export default router
