# Cấu trúc thư mục dự án (Source Tree)

Dưới đây là sơ đồ chi tiết về cấu trúc thư mục của dự án **E-Commerce**, kèm theo mô tả vai trò và chức năng của từng file/thư mục.

```text
e-commerce/
├── public/                               # Chứa các tài nguyên tĩnh phục vụ trực tiếp cho web (favicon, icon...)
├── src/                                  # Thư mục chứa mã nguồn chính của ứng dụng
│   ├── assets/                           # Chứa hình ảnh, vector SVG, logo, icon dùng trong dự án
│   │   ├── hero.png
│   │   ├── mainBanner.svg                # Ảnh nền/banner chính
│   │   ├── react.svg
│   │   ├── searchIcon.svg                # Icon tìm kiếm
│   │   └── vite.svg
│   │
│   ├── components/                       # Chứa các component dùng chung hoặc theo khối UI
│   │   ├── layout/                       # Các component định hình khung sườn layout
│   │   │   ├── RootLayout.jsx            # Layout gốc (bọc <header>, <main> và <footer>)
│   │   │   ├── RootLayout.module.scss    # Style cho RootLayout
│   │   │   ├── HeaderLayout.jsx          # Component Header bọc Navbar
│   │   │   ├── HeaderLayout.module.scss  # Style cho HeaderLayout
│   │   │   └── Footer.jsx                # Component Footer
│   │   └── navbar/                       # Component thanh điều hướng (Navigation Bar)
│   │       ├── Navbar.jsx                # Thanh menu chính (Logo, NavLinks, SearchBar, User/Cart Icons)
│   │       └── Navbar.module.scss        # Style cho Navbar
│   │
│   ├── pages/                            # Các trang (views) của ứng dụng tương ứng với các route
│   │   ├── home/                         # Trang chủ (Route '/')
│   │   │   └── Home.jsx                  # Trang chủ kết hợp các section (Banner, danh mục...)
│   │   ├── banner/                       # Section Banner (Hero Section)
│   │   │   ├── Banner.jsx
│   │   │   └── Banner.module.scss
│   │   ├── shop/                         # Trang cửa hàng (Route '/shop')
│   │   │   ├── Shop.jsx
│   │   │   └── Shop.module.scss
│   │   ├── onSale/                       # Trang khuyến mãi (Route '/onSale')
│   │   │   ├── OnSale.jsx
│   │   │   └── OnSale.module.scss
│   │   ├── newArrivals/                  # Trang hàng mới về (Route '/newArrivals')
│   │   │   ├── NewArrivals.jsx
│   │   │   └── NewArrivals.module.scss
│   │   └── brands/                       # Trang thương hiệu (Route '/brands')
│   │       ├── Brands.jsx
│   │       └── Brands.module.scss
│   │
│   ├── constant/                         # Chứa các hằng số, cấu hình đường dẫn (paths)
│   │   ├── index.js                      # Định nghĩa danh sách path tĩnh (paths: home, shop, ...)
│   │   └── path.js                       # Cấu hình danh sách navLinks (path, component, label)
│   │
│   ├── router/                           # Cấu hình routing cho ứng dụng
│   │   └── Routers.jsx                   # Quản lý <Routes> và lặp qua các <Route> từ path.js
│   │
│   ├── App.css                           # Style chung của App
│   ├── App.jsx                           # Component gốc của ứng dụng (bọc RootLayout và AppRouter)
│   ├── index.css                         # CSS toàn cục (CSS Reset, variables...)
│   └── main.jsx                          # Điểm khởi chạy của React (ReactDOM.createRoot, bọc BrowserRouter)
│
├── .gitignore                            # Cấu hình bỏ qua các file khi commit git
├── eslint.config.js                      # Cấu hình linting ESLint
├── index.html                            # File HTML gốc nạp ứng dụng React
├── package.json                          # Khai báo dependencies và scripts (dev, build...)
├── package-lock.json                     # Khóa phiên bản chi tiết các package dependencies
├── srcTree.md                            # Tài liệu mô tả cây thư mục dự án
└── vite.config.js                        # Cấu hình Vite bundler và plugins
```

---

## 🎯 Luồng hoạt động chính (Data & Component Flow)

1. **`main.jsx`**: Nạp `BrowserRouter` và render `<App />`.
2. **`App.jsx`**: Gọi `<RootLayout>` và truyền `<AppRouter />` làm `children`.
3. **`RootLayout.jsx`**:
   - Hiển thị `<header>` chứa `<HeaderLayout />` $\rightarrow$ `<Navbar />`.
   - Hiển thị `<main>` chứa nội dung động do `<AppRouter />` quyết định dựa trên URL hiện tại.
4. **`Routers.jsx`**: Đọc danh sách cấu hình từ `src/constant/path.js` để render trang tương ứng:
   - `/` $\rightarrow$ `Home` (hiển thị `Banner`)
   - `/shop` $\rightarrow$ `Shop`
   - `/onSale` $\rightarrow$ `OnSale`
   - `/newArrivals` $\rightarrow$ `NewArrivals`
   - `/brands` $\rightarrow$ `Brands`
