import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (req, res) => {
    const items = await Activity.find().populate('user').limit(200).lean();
    res.json(items);
});
router.post('/', async (req, res) => {
    const doc = await Activity.create(req.body);
    res.status(201).json(doc);
});
router.get('/:id', async (req, res) => {
    const doc = await Activity.findById(req.params.id).populate('user').lean();
    if (!doc)
        return res.sendStatus(404);
    res.json(doc);
});
export default router;
