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
│   │   │   ├── ColorFilter/                 # Bộ lọc màu (state cục bộ)
│   │   │   ├── PriceFilter/                 # Bộ lọc giá (MUI Slider, state cục bộ)
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
│   │   │   └── useHorizontalScroll.js         # Clone data + scroll vòng cho Feedback
│   │   │
│   │   ├── constant/
│   │   │   ├── index.js                       # paths + re-export masterData
│   │   │   ├── path.js                        # routes, navLinks, brands, dressStyles
│   │   │   └── masterData.js                  # Hằng số UI: colorList (10), listFeedback (5)
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
│   │   ├── routes/index.js                  # Router /api/v1 (GET /health, GET /products?tag=)
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
| `/shop` | `Shop` | Sidebar filter tĩnh + `ProductList` |
| `/newArrivals` | `NewArrivals` | Dùng lại `ProductSection` với tag `new` |
| `/onSale` | `OnSale` | Placeholder |
| `/brands` | `Brands` | Placeholder |

**Dữ liệu hiện tại**

- Nguồn sản phẩm duy nhất là **API Backend**; `constant/masterData.js` không còn chứa sản phẩm (chỉ còn `colorList`, `listFeedback`).
- Mọi lời gọi API đi qua `src/services/api.js`: `API_BASE_URL` (mặc định `http://localhost:4000`, override bằng `VITE_API_URL`), `resolveImageUrl()`, `getProducts({ tag, limit, skip })`.
- Home/NewArrivals/TopSelling: `ProductSection` gọi `getProducts({ tag, limit: 12 })` — server lọc theo tag (`new` / `popular`). Hiển thị **4** sản phẩm đầu; SHOW MORE hiện thêm **8** (tổng **12**) và nút đổi thành SHOW LESS (về 4). Có trạng thái loading và lỗi.
- Shop: `ProductList` gọi `getProducts({ limit: 9, skip })` — 9 sản phẩm/trang, phân trang thu gọn tối đa 7 nút dạng `1 2 3 4 5 ... last` trượt theo `currentPage`.
- Cả hai dùng chung `ProductCard`: ảnh lấy từ `thumbnail` của API (`/upload/...`), fallback `TS1.svg`; `variant='default'` cho lưới 4 cột, `variant='shop'` cho lưới 3 cột (ảnh cao 250px, tên clamp 2 dòng).
- Số cột do component cha quyết định (`grid-template-columns`); `ProductCard` luôn `width: 100%`, không tự đặt kích thước.
- Filter màu/giá trong `Shop` vẫn là **state cục bộ**, chưa nối vào danh sách sản phẩm.
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
       │           ├─ query: limit, skip, tag (tag rỗng = không lọc)
       │           ├─ products[]: id, slug, name, price, rating, description,
       │           │              category, thumbnail, tags[]
       │           └─ meta: page, limit, total, totalPages (total tính theo tag)
       ├─ notFound             → 404 { error: { code: "ROUTE_NOT_FOUND", ... } }
       └─ errorHandler         → 500/4xx cùng format JSON
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
| variants | 939 (9–12 biến thể/sản phẩm) |

Size theo category: `pants` → 28–34, `dress`/`skirt` → XS–L, còn lại → S–XL.
Màu: mỗi sản phẩm có Black + White + 1 màu xoay vòng trong `colorList`.

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
- [x] Bỏ mảng `products` khỏi `constant/masterData.js` (chỉ giữ `colorList`, `listFeedback`)
- [ ] Bổ sung bộ lọc (category, price, color, size) và sort cho `GET /api/v1/products`
- [ ] Viết API chi tiết sản phẩm: `GET /api/v1/products/:slug` (kèm variants, images, tags)
- [ ] Thêm `hooks/useProducts.js` để tái sử dụng logic gọi API
- [ ] Nối filter (giá/màu/size/category) của trang Shop vào query params và đồng bộ lên URL
- [ ] Đổi tên `pages/landingPage → pages/Home`, `pages/shop → pages/ProductListing`; chuyển các section (`banner`, `topSelling`, …) vào `components/sections/`
- [ ] Xóa `components/Pagination` (không dùng) và `App.css`
- [ ] Bổ sung ảnh cho 70 sản phẩm còn lại (hiện fallback `TS1.svg`)
- [ ] Nén/convert `mainBanner.svg` (6.7MB) và `TS1.svg` (1.2MB) sang WebP
- [ ] Responsive cho Shop/Banner/ProductCard
