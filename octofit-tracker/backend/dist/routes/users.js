import { Router } from 'express';
import User from '../models/user.js';
const router = Router();
router.get('/', async (req, res) => {
    const users = await User.find().limit(100).lean();
    res.json(users);
});
router.post('/', async (req, res) => {
    const doc = await User.create(req.body);
    res.status(201).json(doc);
});
router.get('/:id', async (req, res) => {
    const doc = await User.findById(req.params.id).lean();
    if (!doc)
        return res.sendStatus(404);
    res.json(doc);
});
export default router;
