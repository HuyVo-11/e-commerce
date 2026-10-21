import db from './database.js';
import { products, colors } from './seedData.js';

const CATEGORY_NAMES = {
    shirt: 'Shirts',
    tshirt: 'T-Shirts',
    pants: 'Pants',
    dress: 'Dresses',
    jacket: 'Jackets',
    sweater: 'Sweaters',
    skirt: 'Skirts',
    hoodie: 'Hoodies',
    activewear: 'Activewear',
    shorts: 'Shorts',
    top: 'Tops',
};

const SIZES_BY_CATEGORY = {
    pants: ['28', '30', '32', '34'],
    skirt: ['XS', 'S', 'M', 'L'],
    dress: ['XS', 'S', 'M', 'L'],
    activewear: ['S', 'M', 'L'],
    jacket: ['S', 'M', 'L', 'XL'],
    default: ['S', 'M', 'L', 'XL'],
};

const BRANDS = [
    { name: 'Calvin Klein', slug: 'calvin-klein' },
    { name: 'Gucci', slug: 'gucci' },
    { name: 'Prada', slug: 'prada' },
    { name: 'Versace', slug: 'versace' },
    { name: 'Zara', slug: 'zara' },
];

const slugify = (value) => value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const usedSlugs = new Set();

const createSlug = (product) => {
    const base = slugify(product.name);
    const slug = usedSlugs.has(base) ? `${base}-${slugify(product.id)}` : base;

    usedSlugs.add(slug);

    return slug;
};

// Mỗi sản phẩm có 3 màu: Black, White + 1 màu xoay vòng để filter có dữ liệu thật
const pickColors = (index) => {
    const black = colors.find(color => color.name === 'Black');
    const white = colors.find(color => color.name === 'White');
    const picked = [black, white];

    for (let offset = 0; picked.length < 3 && offset < colors.length; offset += 1) {
        const candidate = colors[(index * 3 + offset) % colors.length];

        if (!picked.some(color => color.name === candidate.name)) {
            picked.push(candidate);
        }
    }

    return picked;
};

const upsertCategory = db.prepare(`
    INSERT INTO categories (slug, name)
    VALUES (@slug, @name)
    ON CONFLICT(slug) DO UPDATE SET name = excluded.name
`);

const selectCategoryId = db.prepare('SELECT id FROM categories WHERE slug = ?');

const upsertBrand = db.prepare(`
    INSERT INTO brands (slug, name)
    VALUES (@slug, @name)
    ON CONFLICT(slug) DO UPDATE SET name = excluded.name
`);

const upsertProduct = db.prepare(`
    INSERT INTO products (id, slug, name, description, category_id, brand_id, price, rating)
    VALUES (@id, @slug, @name, @description, @categoryId, NULL, @price, @rating)
    ON CONFLICT(id) DO UPDATE SET
        slug = excluded.slug,
        name = excluded.name,
        description = excluded.description,
        category_id = excluded.category_id,
        price = excluded.price,
        rating = excluded.rating
`);

const deleteTags = db.prepare('DELETE FROM product_tags WHERE product_id = ?');
const insertTag = db.prepare('INSERT INTO product_tags (product_id, tag) VALUES (?, ?)');

const deleteVariants = db.prepare('DELETE FROM product_variants WHERE product_id = ?');
const insertVariant = db.prepare(`
    INSERT INTO product_variants (product_id, color, color_hex, size, price, stock)
    VALUES (?, ?, ?, ?, ?, ?)
`);

const seed = db.transaction(() => {
    for (const brand of BRANDS) {
        upsertBrand.run(brand);
    }

    const categoryIds = new Map();

    products.forEach((product, index) => {
        if (!categoryIds.has(product.category)) {
            upsertCategory.run({
                slug: product.category,
                name: CATEGORY_NAMES[product.category] ?? product.category,
            });
            categoryIds.set(product.category, selectCategoryId.get(product.category).id);
        }

        upsertProduct.run({
            id: product.id,
            slug: createSlug(product),
            name: product.name,
            description: product.description ?? '',
            categoryId: categoryIds.get(product.category),
            price: product.price,
            rating: product.rating ?? 0,
        });

        deleteTags.run(product.id);
        for (const tag of product.tag ?? []) {
            insertTag.run(product.id, tag);
        }

        deleteVariants.run(product.id);

        const sizes = SIZES_BY_CATEGORY[product.category] ?? SIZES_BY_CATEGORY.default;

        pickColors(index).forEach((color, colorIndex) => {
            sizes.forEach((size, sizeIndex) => {
                const stock = 5 + ((index * 7 + colorIndex * 5 + sizeIndex * 3) % 40);

                insertVariant.run(
                    product.id,
                    color.name,
                    color.hex,
                    size,
                    product.price,
                    stock
                );
            });
        });
    });
});

seed();

const stats = {
    categories: db.prepare('SELECT COUNT(*) AS count FROM categories').get().count,
    brands: db.prepare('SELECT COUNT(*) AS count FROM brands').get().count,
    products: db.prepare('SELECT COUNT(*) AS count FROM products').get().count,
    tags: db.prepare('SELECT COUNT(*) AS count FROM product_tags').get().count,
    variants: db.prepare('SELECT COUNT(*) AS count FROM product_variants').get().count,
};

console.log('Seed hoàn tất:', stats);

db.close();
