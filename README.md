# SHOP.CO — E-commerce

Frontend React + Vite, backend Node.js + Express + SQLite.

## Cấu trúc

```text
.
├── client/                 # React + Vite
│   ├── src/
│   │   ├── pages/          # Home, Shop, NewArrivals, ...
│   │   ├── components/     # ProductCard, Layout, filters, ...
│   │   ├── hooks/          # Custom hooks
│   │   ├── constant/       # paths, navigation, mock data
│   │   └── assets/
│   └── package.json
│
└── server/                 # Express API
    ├── src/
    │   ├── config/         # env
    │   ├── routes/         # /api/v1
    │   ├── middlewares/    # errorHandler, notFound
    │   ├── utils/          # ApiError, asyncHandler
    │   └── db/             # database, migrations, seed
    ├── data/               # SQLite (không commit)
    └── package.json
```

## Yêu cầu

- Node.js >= 22

## Chạy frontend

```bash
cd client
npm install
npm run dev
```

Mặc định: http://localhost:5173

## Chạy backend

```bash
cd server
npm install
copy .env.example .env
npm run db:reset
npm run dev
```

API mặc định: http://localhost:4000/api/v1

- `GET /api/v1/health`
- Database: `server/data/shop.db` (SQLite, sinh bởi `db:reset`)
- Seed: 30 sản phẩm, 11 danh mục, 5 thương hiệu, 354 biến thể màu/size

### Scripts

| Script | Mô tả |
|---|---|
| `npm run dev` | Chạy server với watch mode |
| `npm start` | Chạy server |
| `npm run db:migrate` | Áp dụng migration còn thiếu |
| `npm run db:seed` | Seed dữ liệu |
| `npm run db:reset` | Xóa DB + migrate + seed |

Biến môi trường (`server/.env`): `PORT`, `CORS_ORIGIN`, `DB_PATH`, `NODE_ENV`.
