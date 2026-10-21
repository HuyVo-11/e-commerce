import { Router } from 'express';

import db from '../db/database.js';

const router = Router();

const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 100;

const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);

    return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
    });
});

router.get('/products', (req, res, next) => {
    try {
        const limit = Math.min(Math.max(parsePositiveInt(req.query.limit, DEFAULT_LIMIT), 1), MAX_LIMIT);
        const skip = parsePositiveInt(req.query.skip, 0);

        const { count: total } = db.prepare('SELECT COUNT(*) AS count FROM products').get();

        const products = db.prepare(`
            SELECT
                p.id,
                p.slug,
                p.name,
                p.price,
                p.rating,
                p.description,
                c.name AS category,
                (
                    SELECT pi.url
                    FROM product_images pi
                    WHERE pi.product_id = p.id
                    ORDER BY pi.position ASC
                    LIMIT 1
                ) AS thumbnail
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.id
            LIMIT ? OFFSET ?
        `).all(limit, skip);

        res.json({
            products,
            meta: {
                page: Math.floor(skip / limit) + 1,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            skip,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
