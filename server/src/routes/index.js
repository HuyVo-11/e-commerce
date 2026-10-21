import { Router } from 'express';

import db from '../db/database.js'

const router = Router();

router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
    });
});

router.get('/products', (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 12;
        const skip = parseInt(req.querry.skip, 10) || 0;

        const total = db.prepare('SELECT COUNT(*) AS count FROM products').get().count;

        const products = db.prepare(`
            SELECT
                p.id,
                p.name,
                p.price,
                p.rating,
                p.description,
                c.name AS category
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LIMIT ? OFFSET ?
        `).all(limit, skip);

        res.json({
            products,
            total,
            limit,
            skip,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;
