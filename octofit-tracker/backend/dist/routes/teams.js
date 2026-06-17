import { Router } from 'express';
import Team from '../models/team.js';
const router = Router();
router.get('/', async (req, res) => {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
});
router.post('/', async (req, res) => {
    const doc = await Team.create(req.body);
    res.status(201).json(doc);
});
router.get('/:id', async (req, res) => {
    const doc = await Team.findById(req.params.id).populate('members').lean();
    if (!doc)
        return res.sendStatus(404);
    res.json(doc);
});
export default router;
