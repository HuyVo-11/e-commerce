import { Router } from 'express';

import db from '../db/database.js';

const router = Router();

const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 100;

const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);

    return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

const parseTag = (value) => (typeof value === 'string' && value.trim() ? value.trim() : null);

// Điều kiện lọc theo tag, dùng chung cho câu COUNT và câu SELECT
const TAG_FILTER = `WHERE EXISTS (
                    SELECT 1
                    FROM product_tags pt
                    WHERE pt.product_id = p.id AND pt.tag = ?
                )`;

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
        const tag = parseTag(req.query.tag);

        const total = tag
            ? db.prepare(`SELECT COUNT(*) AS count FROM products p ${TAG_FILTER}`).get(tag).count
            : db.prepare('SELECT COUNT(*) AS count FROM products').get().count;

        const rows = db.prepare(`
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
                ) AS thumbnail,
                (
                    SELECT group_concat(pt.tag)
                    FROM product_tags pt
                    WHERE pt.product_id = p.id
                ) AS tags
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ${tag ? TAG_FILTER : ''}
            ORDER BY p.id
            LIMIT ? OFFSET ?
        `).all(...(tag ? [tag, limit, skip] : [limit, skip]));

        const products = rows.map(({ tags, ...rest }) => ({
            ...rest,
            tags: tags ? tags.split(',') : [],
        }));

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
