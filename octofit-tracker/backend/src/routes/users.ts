import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'List users (placeholder)' })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create user (placeholder)', body: req.body })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'Get user (placeholder)', id: req.params.id })
})

export default router
