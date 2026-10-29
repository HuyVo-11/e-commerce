import { Router } from 'express';
import { ApiError } from '../utils/ApiError.js';

import db from '../db/database.js';

const router = Router();

const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 100;
const MAX_PRICE = 5000;
const PRICE_PATTERN = /^\d+(?:\.\d+)?$/; //điều kiện để giá luôn luôn đc format
const SIZE_VALUES = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large'];
const SIZE_SET = new Set(SIZE_VALUES);


const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);

    return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

const parseTag = (value) => (typeof value === 'string' && value.trim() ? value.trim() : null);

// Mỗi sản phẩm hiện chỉ có một size, nên filter size là so khớp chính xác.
const parseSizeParam = (query) => {
    const raw = query.size;

    if (raw === undefined) return null;

    if (typeof raw !== 'string') {
        throw new ApiError(
            400,
            'INVALID_SIZE_FILTER',
            'size chỉ được truyền một lần',
            { param: 'size' }
        );
    }

    const value = raw.trim();

    if (value === '') return null;

    if (!SIZE_SET.has(value)) {
        throw new ApiError(
            400,
            'INVALID_SIZE_FILTER',
            'size không hợp lệ',
            { param: 'size', value, allowed: SIZE_VALUES }
        );
    }

    return value;
};

// lấy giá trị tử query
const parsePriceParam = (query, name) => {  // query = rep.query, đặt tên biến tuỳ thích
    const raw = query[name];                // truy cập thuộc tính của obj bằng tên đc truyền vào biến 'name'
    // const query = {
    //     minPrice : '100'
    //     maxPrice : '200'
    // };
    // const name = 'minPrice'
    // const raw = query[name]
    // console.log(raw) === '100';

    // kiểm tra xem tham số 'raw' có tồn tại k
    if (raw === undefined) return null; // null để phân biệt với 0, 0 là vẫn có giá, còn null là ko dùng filter giá

    // kiểm tra kiểu dữ liệu
    if (typeof raw !== 'string') {  // !== dùng để so sánh cả kiểu dữ liệu lẫn giá trị
        throw new ApiError(
            400,
            'INVALID_PRICE_FILTER',
            `${name} chỉ được truyền một lần`,
            { param: name }
        );
    };

    // lọc các khoảng trắng
    const value = raw.trim();

    // nếu chuỗi rỗng thì bỏ qua bộ lọc
    if (value === '') return null;  // nếu sau khi trim() trả về '', thì k áp dụng bộ lọc giá
    // không trả về lỗi khi null. ko nhập giá coi như không lọc

    // kiểm tra chuỗi có đúng định dạng số không
    if (!PRICE_PATTERN.test(value)) {    //PRICE_PATTERN.test(value) === true -> đúng định dạng,
        throw new ApiError(             // thêm ! sẽ đảo ngược kết quả -> === false -> throw error
            400,
            'INVALID_PRICE_FILTER',
            `${name} phải là số không âm`,
            {
                param: name,
                value: raw,
            }
        );
    }

    // chuyển chuỗi thành số
    const parse = Number(value);    // Number('100') -> 100
    // trả về số để BE có thể validate các điều kiện

    // kiểm tra số xem có nằm trong khoảng giới hạn không
    if (!Number.isFinite(parse) || parse > MAX_PRICE) { //Number.isFinite(parse) nghĩa là check xem thg parse có hữu hạn k
        throw new ApiError(
            400,
            'INVALID_PRICE_FILTER',
            `${name} vượt quá giới hạn cho phép`,
            {
                param: name,
                value: parse,
                max: MAX_PRICE,
            }
        );
    }
    return parse;
};

// nhận các bộ lọc, sử dụng destructing
const buildProductFilters = ({ tag, minPrice, maxPrice, size }) => {

    //tạo 2 mảng rỗng để lưu giá trị
    const conditions = [];   // condition sẽ lưu các điều kiện sql
    // ví dụ : condition ('p.price >= ?'; 'p.price <= ?') -> ['p.price >= ?' && 'p.price <= ?']
    const params = [];   //lưu các giá trị tương ứng với dấu ?
    // ví dụ theo tiếp ở trên (param.push(200); (param.push(500); -> [200, 500]
    //

    //thêm điều kiện tag
    if (tag) {
        conditions.push(`EXISTS (
                    SELECT 1
                    FROM product_tags pt
                    WHERE pt.product_id = p.id AND pt.tag = ?
                )`);
        params.push(tag);
    }

    // thêm điều kiện size
    if (size) {
        conditions.push(`EXISTS (
                    SELECT 1
                    FROM product_variants pv
                    WHERE pv.product_id = p.id AND pv.size = ?
                )`);
        params.push(size);
    }

    //thêm điều kiện minPrice
    if (minPrice !== null) { // dùng null để vẫn chạy đc nếu == 0
        conditions.push('p.price >= ?');
        params.push(minPrice);
    }

    // thêm đk maxPrice
    if (maxPrice !== null) {
        conditions.push('p.price <= ?');
        params.push(maxPrice);
    }

    return {            // trả về 1 obj ( whereSql, params)
        whereSql: conditions.length > 0  // kiểm xem mảng conditions có điều kiện nào k
        ? `WHERE ${conditions.join(' AND ')}`   // nếu có thì join các đk thành 1 chuỗi, bỏ AND nằm giữa các đk
        : '',                                   // ko có thì trả rỗng
        params,
    };
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
        const tag = parseTag(req.query.tag);
        const size = parseSizeParam(req.query);
        const minPrice = parsePriceParam(req.query, 'minPrice');
        const maxPrice = parsePriceParam(req.query, 'maxPrice');

        if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
            throw new ApiError(
                400,
                'INVALID_PRICE_RANGE',
                'minPrice không được lớn hơn maxPrice',
                { minPrice, maxPrice }
            );
        }

        const { whereSql, params } = buildProductFilters({ tag, minPrice, maxPrice, size });

        const total = db
            .prepare(`SELECT COUNT(*) AS count FROM products p ${whereSql}`)
            .get(...params).count;

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
                ) AS tags,
                (
                    SELECT pv.size
                    FROM product_variants pv
                    WHERE pv.product_id = p.id
                    ORDER BY pv.id ASC
                    LIMIT 1
                ) AS size
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ${whereSql}
            ORDER BY p.id
            LIMIT ? OFFSET ?
        `).all(...params, limit, skip);

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
