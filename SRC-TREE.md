# Cấu trúc dự án SHOP.CO

Tài liệu mô tả cây thư mục hiện tại của dự án sau khi tách **frontend (`client/`)** và **backend (`server/`)**.

**Stack:** React 19 + Vite 8 + React Router 7 + SCSS Modules · Node.js + Express 5 + SQLite (`better-sqlite3`).

---

## 1. Cây thư mục

```text
e-commerce/
├── client/                                  # FRONTEND: React + Vite
│   ├── public/                              # Tài nguyên tĩnh (favicon.svg, icons.svg)
│   ├── src/
│   │   ├── assets/                          # Ảnh, logo thương hiệu, icon, banner
│   │   │   ├── mainBanner.svg               # Nền hero (raster nhúng base64, ~6.7MB)
│   │   │   ├── TS1.svg                      # Ảnh sản phẩm mẫu (fallback khi API chưa có ảnh)
│   │   │   ├── {casual,formal,party,gym}.svg # Ảnh minh hoạ "Browse by dress style"
│   │   │   ├── hero.png, searchIcon.svg
│   │   │   └── {ck,gc,pd,vs,zr}.svg         # Logo Calvin Klein, Gucci, Prada, Versace, Zara
│   │   │
│   │   ├── components/                      # Component tái sử dụng
│   │   │   ├── Layout/
│   │   │   │   ├── RootLayout.{jsx,module.scss}     # Header + Breadcrumb + nội dung + Footer
│   │   │   │   ├── Header/
│   │   │   │   │   ├── HeaderLayout.{jsx,module.scss}
│   │   │   │   │   └── Navbar/Navbar.{jsx,module.scss}
│   │   │   │   └── Footer/
│   │   │   │       ├── FooterLayout.{jsx,module.scss}
│   │   │   │       ├── FooterNavbar/FooterNavbar.{jsx,module.scss}      # đang comment, chưa dùng
│   │   │   │       └── Subscription/Subscription.{jsx,module.scss}
│   │   │   ├── ProductCard/                 # Thẻ 1 sản phẩm: ảnh, tên, sao, giá (variant 'default' | 'shop')
│   │   │   ├── ProductSection/              # Section theo tag từ API: 4 → 12 sản phẩm (SHOW MORE / SHOW LESS)
│   │   │   ├── ProductList/                 # Lưới 3 cột, phân trang 9/trang – dùng lại ProductCard
│   │   │   ├── FeedbackCard/                # Thẻ đánh giá khách hàng
│   │   │   ├── PriceFilter/                 # Bộ lọc giá (MUI Slider, controlled qua value/onChange)
│   │   │   ├── Pagination/                  # Phân trang tĩnh (chưa được dùng)
│   │   │   └── Breadcrumb/                  # Breadcrumb tự sinh từ URL
│   │   │
│   │   ├── pages/                           # Trang & section
│   │   │   ├── landingPage/LandingPage.*     # Route "/" – ghép các section
│   │   │   ├── banner/Banner.*               # Hero + số liệu + dải logo
│   │   │   ├── newArrivals/NewArrivals.*     # Route "/newArrivals" và section ở Home (tag "new")
│   │   │   ├── topSelling/TopSelling.*       # Section Home (tag "popular")
│   │   │   ├── dressStyle/DressStyle.*       # Section "Browse by dress style"
│   │   │   ├── feedback/Feedback.*           # Section đánh giá + infinite scroll ngang
│   │   │   ├── shop/Shop.*                   # Route "/shop" – sidebar filter + danh sách
│   │   │   ├── onSale/OnSale.*               # Route "/onSale" (placeholder)
│   │   │   └── brands/Brands.*               # Route "/brands" (placeholder)
│   │   │
│   │   ├── hooks/
│   │   │   ├── useProductFilters.js           # URL filter, normalize, validation, Apply/Clear
│   │   │   ├── useFilterDraft.js              # Draft giá/size cho nút Apply Filter
│   │   │   ├── useProducts.js                 # Fetch sản phẩm + AbortController
│   │   │   ├── useDisclosure.js               # Đóng/mở UI (Size, filter panel)
│   │   │   └── useHorizontalScroll.js         # Clone data + scroll vòng cho Feedback
│   │   │
│   │   ├── constant/
│   │   │   ├── index.js                       # paths + re-export masterData
│   │   │   ├── path.js                        # routes, navLinks, brands, dressStyles
│   │   │   └── masterData.js                  # Hằng số UI: sizeList, listFeedback, brands, dressStyles, PRODUCT_TAGS
│   │   │
│   │   ├── services/
│   │   │   └── api.js                         # API_BASE_URL, resolveImageUrl, getProducts (nơi duy nhất gọi backend)
│   │   │
│   │   ├── router/Routers.jsx                 # Map cấu hình routes -> <Route>
│   │   ├── App.jsx                            # RootLayout + AppRouter
│   │   ├── main.jsx                           # createRoot + BrowserRouter
│   │   ├── index.scss                         # Reset, biến CSS, font, style toàn cục
│   │   └── App.css                            # (gần như không dùng)
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── package-lock.json
│
├── server/                                  # BACKEND: Node.js + Express
│   ├── public/                              # File tĩnh phục vụ trực tiếp
│   │   └── upload/                          # Ảnh sản phẩm (P001.jpg -> P010.jpg)
│   ├── src/
│   │   ├── config/env.js                    # Đọc & validate PORT, CORS_ORIGIN, DB_PATH
│   │   ├── routes/index.js                  # Router /api/v1 (GET /health, GET /products?tag=&minPrice=&maxPrice=)
│   │   ├── middlewares/
│   │   │   ├── notFound.js                  # 404 -> ApiError
│   │   │   └── errorHandler.js              # Mọi lỗi -> { error: { code, message } }
│   │   ├── utils/
│   │   │   ├── ApiError.js                  # Lỗi có statusCode + code
│   │   │   └── asyncHandler.js              # Bọc handler async
│   │   ├── db/
│   │   │   ├── database.js                  # Mở SQLite (WAL, foreign_keys ON)
│   │   │   ├── migrate.js                   # Runner migration + bảng _migrations
│   │   │   ├── migrations/001_init.sql       # Schema catalog
│   │   │   ├── seed.js                      # Seed idempotent (products/images/tags/variants)
│   │   │   ├── seedData.js                  # 80 sản phẩm + 10 màu
│   │   │   └── reset.js                     # Xóa DB -> migrate -> seed
│   │   ├── app.js                           # CORS, static /upload, mount /api/v1, 404, error
│   │   └── server.js                        # listen + graceful shutdown
│   ├── data/
│   │   ├── .gitkeep
│   │   └── shop.db                          # SQLite (không commit)
│   ├── .env                                 # Không commit
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── AGENTS.md                                # Hướng dẫn bắt buộc dành cho Agent
├── AI-RULES.md                              # Quy định phân quyền, an toàn và phê duyệt
└── SRC-TREE.md                              # Tài liệu cấu trúc dự án (file này)
```

---

## 2. Luồng frontend

1. `main.jsx` nạp `BrowserRouter`, `index.scss` và render `<App />`.
2. `App.jsx` bọc `<AppRouter />` trong `<RootLayout>`.
3. `RootLayout` render `HeaderLayout` (Navbar đọc `navLinks`), `Breadcrumb`, nội dung, `FooterLayout`.
4. `Routers.jsx` đọc `routes` từ `constant/path.js` và map thành `<Route>`.

| Route | Component | Ghi chú |
|---|---|---|
| `/` | `LandingPage` | Banner → NewArrivals → TopSelling → DressStyle → Feedback |
| `/shop` | `Shop` | Sidebar filter (giá + size đã nối API) + `ProductList` |
| `/newArrivals` | `NewArrivals` | Dùng lại `ProductSection` với tag `new` |
| `/onSale` | `OnSale` | Placeholder |
| `/brands` | `Brands` | Placeholder |

**Dữ liệu hiện tại**

- Nguồn sản phẩm duy nhất là **API Backend**; `constant/masterData.js` không còn chứa sản phẩm (chỉ còn `sizeList`, `listFeedback`, `brands`, `dressStyles`, `PRODUCT_TAGS`).
- Mọi lời gọi API đi qua `src/services/api.js`: `API_BASE_URL` (mặc định `http://localhost:4000`, override bằng `VITE_API_URL`), `resolveImageUrl()`, `getProducts({ tag, minPrice, maxPrice, size, limit, skip })`.
- Home/NewArrivals/TopSelling: `ProductSection` gọi `getProducts({ tag, limit: 12 })` — server lọc theo tag (`new` / `popular`). Hiển thị **4** sản phẩm đầu; SHOW MORE hiện thêm **8** (tổng **12**) và nút đổi thành SHOW LESS (về 4). Có trạng thái loading và lỗi.
- Shop: `ProductList` dùng `useProducts({ filters, page, limit: 9 })` — hook này gọi `getProducts` với `minPrice`/`maxPrice`/`size`; 9 sản phẩm/trang, phân trang thu gọn tối đa 7 nút dạng `1 2 3 4 5 ... last` trượt theo `currentPage`. `size` là mảng, có thể chọn nhiều size.
- Cả hai dùng chung `ProductCard`: ảnh lấy từ `thumbnail` của API (`/upload/...`), fallback `TS1.svg`; `variant='default'` cho lưới 4 cột, `variant='shop'` cho lưới 3 cột (ảnh cao 250px, tên clamp 2 dòng).
- Số cột do component cha quyết định (`grid-template-columns`); `ProductCard` luôn `width: 100%`, không tự đặt kích thước.
- Logic filter giá/size được tách theo trách nhiệm: `useProductFilters` (URL, normalize, validation, Apply/Clear), `useFilterDraft` (draft giá/size cho Apply), `useProducts` (fetch + AbortController), `useDisclosure` (đóng/mở UI). `Shop` ghép các hook và truyền `filters`/`errors`/`isValid` xuống `ProductList`.
- Filter giá đã nối với URL: slider là controlled component, bấm **Apply Filter** sẽ ghi `minPrice`/`maxPrice` và reset `page=0`; URL là nguồn dữ liệu chính. Nếu URL có `minPrice > maxPrice`, slider sắp xếp lại để không chéo thumb, `ProductList` hiển thị lỗi và **không gọi API**; bấm Apply sẽ ghi lại cặp giá hợp lệ.
- Filter size: 5 lựa chọn lấy từ `sizeList` (`X-Small`, `Small`, `Medium`, `Large`, `X-Large`), cho phép chọn nhiều size; bấm lại để bỏ chọn. Bấm **Apply Filter** ghi nhiều param `size` vào URL và reset `page=0`; URL có size không hợp lệ thì `ProductList` báo lỗi và **không gọi API**.
- Ảnh thật chỉ có cho `P001`–`P010`; 70 sản phẩm còn lại hiển thị fallback `TS1.svg`.

---

## 3. Luồng backend

```text
server.js
  └─ app.js
       ├─ cors (CORS_ORIGIN)
       ├─ express.json()
       ├─ /upload → express.static('public/upload')  (phục vụ ảnh sản phẩm)
       ├─ /api/v1 → routes/index.js
       │     ├─ GET /health    → { status, uptime, timestamp }
       │     └─ GET /products  → { products, meta, skip }
       │           ├─ query: limit, skip, tag, minPrice, maxPrice, size
       │           │         (tag / giá / size rỗng = không lọc)
       │           ├─ products[]: id, slug, name, price, rating, description,
       │           │              category, thumbnail, tags[], size
       │           └─ meta: page, limit, total, totalPages
       │                     (total tính theo tất cả filter đang áp dụng)
       ├─ notFound             → 404 { error: { code: "ROUTE_NOT_FOUND", ... } }
       └─ errorHandler         → 500/4xx cùng format JSON
```

> Router được mount tại `/api/v1` trong `app.js`, nên đường dẫn đầy đủ là
> `GET /api/v1/products`. Gọi `/products` (không có tiền tố) sẽ trả 404.

### Lọc theo giá (`minPrice`, `maxPrice`)

| Param | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `minPrice` | number ≥ 0 | không lọc | Giá thấp nhất, điều kiện `price >= minPrice` |
| `maxPrice` | number ≥ 0 | không lọc | Giá cao nhất, điều kiện `price <= maxPrice` |

- So sánh **bao gồm biên**; có thể truyền một hoặc cả hai.
- `?minPrice=` (rỗng) hoặc chỉ khoảng trắng → coi như không lọc.
- `minPrice > maxPrice` → `400 INVALID_PRICE_RANGE`.
- Sai định dạng, số âm, vượt `MAX_PRICE = 5000`, hoặc truyền lặp → `400 INVALID_PRICE_FILTER`.
- `parsePriceParam` đọc & validate query; `buildProductFilters` dựng `WHERE` + `params`.
- Câu `COUNT` và `SELECT` dùng chung `whereSql`/`params`, nên `meta.total` luôn khớp dữ liệu đã lọc.
- Lọc trên `products.price` (đã có index `idx_products_price`), không phải giá trong `product_variants`.
- Kết hợp được với `tag`, `limit`, `skip`.

```text
GET /api/v1/products?minPrice=50
GET /api/v1/products?maxPrice=100&limit=100
GET /api/v1/products?minPrice=50&maxPrice=100&tag=new
GET /api/v1/products?minPrice=200&maxPrice=50   → 400 INVALID_PRICE_RANGE
GET /api/v1/products?minPrice=abc                → 400 INVALID_PRICE_FILTER
```

### Lọc theo size (`size`)

| Param | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `size` | string, có thể lặp | không lọc | Một hoặc nhiều giá trị trong `X-Small`, `Small`, `Medium`, `Large`, `X-Large` |

- Mỗi sản phẩm hiện có đúng **1 size** (3 variants = 3 màu × 1 size).
- `buildProductFilters` dùng `EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.size IN (...))` nên `meta.total` khớp với danh sách đã lọc.
- `?size=` (rỗng) hoặc chỉ khoảng trắng → không lọc.
- Có thể lặp `size` để lọc nhiều size; giá trị trùng được loại bỏ.
- Giá trị ngoài 5 size trên → `400 INVALID_SIZE_FILTER`.
- API trả thêm `size` cho từng sản phẩm; subquery có `ORDER BY pv.id LIMIT 1` để kết quả deterministic.

```text
GET /api/v1/products?size=Small
GET /api/v1/products?size=Small&size=Large
GET /api/v1/products?size=Small&size=Large&minPrice=50&maxPrice=100
GET /api/v1/products?size=XXL                 → 400 INVALID_SIZE_FILTER
```

**Database**

- Mở lazy trong `db/database.js`, đường dẫn lấy từ `DB_PATH` (mặc định `./data/shop.db`).
- `migrate.js` chạy các file `.sql` chưa có trong bảng `_migrations`.
- `seed.js` chạy trong transaction, idempotent (upsert product, xóa & insert lại tag/variant).
- `db:reset` xóa `shop.db` (+ `-wal`, `-shm`) rồi migrate + seed.

### Schema (001_init.sql)

| Bảng | Cột chính | Mục đích |
|---|---|---|
| `categories` | `id, slug, name` | Danh mục sản phẩm |
| `brands` | `id, slug, name, logo_url` | Thương hiệu |
| `products` | `id (TEXT), slug, name, description, category_id, brand_id, price, rating, created_at` | Sản phẩm |
| `product_tags` | `product_id, tag` (PK kép) | `new`, `popular`, … |
| `product_images` | `id, product_id, url, alt, position` | Ảnh sản phẩm (đã nạp 10 ảnh từ `public/upload`) |
| `product_variants` | `id, product_id, color, color_hex, size, price, stock`, UNIQUE `(product_id, color, size)` | Biến thể màu + size + tồn kho |

Index: `products(category_id)`, `products(price)`, `product_tags(tag)`, `product_variants(product_id/color/size)`.

### Dữ liệu seed

| Bảng | Số bản ghi |
|---|---|
| categories | 11 |
| brands | 5 (chưa gán `brand_id` cho product) |
| products | 80 |
| images | 10 |
| tags | 90 |
| variants | 240 (3 biến thể/sản phẩm: 3 màu × 1 size) |

Mỗi sản phẩm có đúng 1 size trong 5 giá trị: `X-Small`, `Small`, `Medium`, `Large`, `X-Large` (khai báo ở `seedData.js`).
Màu: mỗi sản phẩm có Black + White + 1 màu xoay vòng trong `seedData.js`.

---

## 4. Chạy dự án

```bash
# Frontend
cd client
npm install
npm run dev            # http://localhost:5173

# Backend
cd server
npm install
copy .env.example .env
npm run db:reset
npm run dev            # http://localhost:4000/api/v1
```

### Biến môi trường (`server/.env`)

| Biến | Mặc định | Mô tả |
|---|---|---|
| `NODE_ENV` | `development` | Môi trường |
| `PORT` | `4000` | Port API (3000 dành cho project khác) |
| `CORS_ORIGIN` | `http://localhost:5173` | Origin được phép, phân tách bằng dấu phẩy |
| `DB_PATH` | `./data/shop.db` | Đường dẫn SQLite, tính từ `server/` |

### Biến môi trường (`client/.env`, tuỳ chọn)

| Biến | Mặc định | Mô tả |
|---|---|---|
| `VITE_API_URL` | `http://localhost:4000` | Base URL API backend, đọc trong `client/src/services/api.js` |

> Frontend bắt buộc có backend đang chạy, nếu không `ProductSection`/`ProductList` sẽ hiển thị thông báo lỗi tải dữ liệu.

### Scripts

| Nơi | Script | Mô tả |
|---|---|---|
| client | `dev`, `build`, `preview`, `lint` | Vite |
| server | `dev`, `start` | Chạy API (`dev` dùng `node --watch`) |
| server | `db:migrate` | Áp dụng migration còn thiếu |
| server | `db:seed` | Seed dữ liệu |
| server | `db:reset` | Xóa DB + migrate + seed |

---

## 5. Việc còn lại

- [x] Tạo API `GET /api/v1/products` (phân trang limit/skip + meta + thumbnail)
- [x] Lọc theo tag ở server: `?tag=new|popular`, kèm `tags[]` trong từng sản phẩm
- [x] Client `ProductList` kết nối API Backend thay cho `dummyjson`
- [x] Seed ảnh sản phẩm vào `product_images` và phục vụ qua `server/public/upload`
- [x] Gom mọi lời gọi API vào `client/src/services/api.js` (`API_BASE_URL`, `resolveImageUrl`, `getProducts`)
- [x] `ProductCard` dùng chung cho `ProductSection` (4 cột) và `ProductList` (3 cột) qua prop `variant`
- [x] Bỏ mảng `products` khỏi `constant/masterData.js` (giữ `listFeedback` và các hằng số UI khác)
- [x] Lọc theo giá ở server: `?minPrice=&maxPrice=`, validate + `meta.total` theo filter
- [x] Lọc theo size ở server: `?size=`, validate + `meta.total` theo filter
- [ ] Bổ sung bộ lọc category và sort cho `GET /api/v1/products`
- [ ] Viết API chi tiết sản phẩm: `GET /api/v1/products/:slug` (kèm variants, images, tags)
- [x] Thêm `hooks/useProducts.js` để tái sử dụng logic gọi API
- [x] Nối filter giá của trang Shop vào URL: Apply ghi `minPrice`/`maxPrice` và reset `page=0`
- [x] Chặn khoảng giá không hợp lệ từ URL (`minPrice > maxPrice`) ở client
- [x] Nối filter size của trang Shop vào query params và đồng bộ lên URL
- [ ] Nối filter category của trang Shop vào query params và đồng bộ lên URL
- [ ] Đồng bộ text "Showing ..." và sort với kết quả filter
- [ ] Trả khoảng giá thực tế (`MIN(price)`/`MAX(price)`) để slider không hard-code `0–250`
- [ ] Đổi tên `pages/landingPage → pages/Home`, `pages/shop → pages/ProductListing`; chuyển các section (`banner`, `topSelling`, …) vào `components/sections/`
- [ ] Xóa `components/Pagination` (không dùng) và `App.css`
- [ ] Bổ sung ảnh cho 70 sản phẩm còn lại (hiện fallback `TS1.svg`)
- [ ] Nén/convert `mainBanner.svg` (6.7MB) và `TS1.svg` (1.2MB) sang WebP
- [ ] Responsive cho Shop/Banner/ProductCard
