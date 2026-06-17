import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'List workouts (placeholder)' })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create workout (placeholder)', body: req.body })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'Get workout (placeholder)', id: req.params.id })
})

export default router
