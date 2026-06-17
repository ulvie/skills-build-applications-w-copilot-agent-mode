import { Router } from 'express'
import Workout from '../models/workout.js'

const router = Router()

router.get('/', async (req, res) => {
  const items = await Workout.find().limit(200).lean()
  res.json(items)
})

router.post('/', async (req, res) => {
  const doc = await Workout.create(req.body)
  res.status(201).json(doc)
})

router.get('/:id', async (req, res) => {
  const doc = await Workout.findById(req.params.id).lean()
  if (!doc) return res.sendStatus(404)
  res.json(doc)
})

export default router
