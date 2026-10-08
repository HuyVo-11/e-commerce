# Cấu trúc thư mục dự án (Source Tree)

Dưới đây là sơ đồ chi tiết về cấu trúc thư mục của dự án **E-Commerce**, kèm theo mô tả vai trò và chức năng của từng file/thư mục.

```text
e-commerce/
├── public/                               # Chứa các tài nguyên tĩnh phục vụ trực tiếp cho web
│   ├── favicon.svg                       # Favicon trang web
│   └── icons.svg                         # File SVG icons
│
├── src/                                  # Thư mục chứa mã nguồn chính của ứng dụng
│   ├── assets/                           # Chứa hình ảnh, vector SVG, logo các thương hiệu
│   │   ├── hero.png                      # Hình ảnh người mẫu Hero Banner
│   │   ├── mainBanner.svg                # Ảnh nền/banner chính
│   │   ├── searchIcon.svg                # Icon tìm kiếm
│   │   ├── TS1.svg                       # Ảnh sản phẩm mẫu (T-shirt)
│   │   ├── ck.svg                        # Logo thương hiệu Calvin Klein
│   │   ├── gc.svg                        # Logo thương hiệu Gucci
│   │   ├── pd.svg                        # Logo thương hiệu Prada
│   │   ├── vs.svg                        # Logo thương hiệu Versace
│   │   └── zr.svg                        # Logo thương hiệu Zara
│   │
│   ├── components/                       # Chứa các component dùng chung hoặc theo khối UI
│   │   ├── Layout/                       # Các component định hình khung sườn layout
│   │   │   ├── RootLayout.jsx            # Layout gốc (bọc <header>, <main> và <footer>)
│   │   │   ├── RootLayout.module.scss    # Style cho RootLayout
│   │   │   ├── HeaderLayout.jsx          # Component Header bọc Navbar
│   │   │   ├── HeaderLayout.module.scss  # Style cho HeaderLayout
│   │   │   └── Footer.jsx                # Component Footer chân trang
│   │   ├── Navbar/                       # Component thanh điều hướng (Navigation Bar)
│   │   │   ├── Navbar.jsx                # Thanh menu chính (Logo, NavLinks, SearchBar, User/Cart Icons)
│   │   │   └── Navbar.module.scss        # Style cho Navbar
│   │   └── ProductCard/                  # Component thẻ sản phẩm (Product Card)
│   │       ├── ProductCard.jsx           # Hiển thị ảnh, tên sản phẩm, đánh giá sao (FaStar) và giá tiền
│   │       └── ProductCard.module.scss   # Style cho ProductCard (kích thước, hover, bố cục)
│   │
│   ├── pages/                            # Các trang và sections của ứng dụng
│   │   ├── landingPage/                  # Trang đích chính (Route '/')
│   │   │   └── LandingPage.jsx           # Kết hợp Banner và NewArrivals
│   │   ├── banner/                       # Section Banner chính (Hero section & Brand logos)
│   │   │   ├── Banner.jsx                # Nội dung banner chào mừng, nút Shop Now và dải logo thương hiệu
│   │   │   └── Banner.module.scss        # Style cho Banner
│   │   ├── newArrivals/                  # Section / Trang hàng mới về (Route '/newArrivals')
│   │   │   ├── NewArrivals.jsx           # Lọc sản phẩm mới (tag: 'new'), render ProductCard, toggle "View All" / "Reset"
│   │   │   └── NewArrivals.module.scss   # Style bố cục lưới 4 cột / hàng, responsive cho NewArrivals
│   │   ├── shop/                         # Trang cửa hàng (Route '/shop')
│   │   │   ├── Shop.jsx                  # Giao diện trang Shop
│   │   │   └── Shop.module.scss          # Style cho trang Shop
│   │   ├── onSale/                       # Trang khuyến mãi (Route '/onSale')
│   │   │   ├── OnSale.jsx                # Giao diện trang OnSale
│   │   │   └── OnSale.module.scss        # Style cho trang OnSale
│   │   └── brands/                       # Trang thương hiệu (Route '/brands')
│   │       ├── Brands.jsx                # Giao diện trang Brands
│   │       └── Brands.module.scss        # Style cho trang Brands
│   │
│   ├── constant/                         # Chứa các hằng số, cấu hình đường dẫn và mock data
│   │   ├── index.js                      # Khai báo object paths định danh các routes ('/', '/shop', ...)
│   │   ├── path.js                       # Cấu hình danh sách routes (cho Router) và navLinks (cho Navbar)
│   │   └── productData.js                # Danh sách dữ liệu mẫu các sản phẩm (id, name, price, rating, tag...)
│   │
│   ├── router/                           # Cấu hình định tuyến (Routing)
│   │   └── Routers.jsx                   # Quản lý <Routes> và lặp qua các <Route> cấu hình từ path.js
│   │
│   ├── App.css                           # Style dùng chung cho App
│   ├── App.jsx                           # Component gốc (kết hợp RootLayout và AppRouter)
│   ├── index.scss                        # SCSS toàn cục (CSS Reset, biến màu sắc, font chữ chung)
│   └── main.jsx                          # Điểm khởi chạy React (createRoot, StrictMode, BrowserRouter)
│
├── .gitignore                            # Cấu hình bỏ qua các file khi commit git
├── eslint.config.js                      # Cấu hình kiểm tra cú pháp mã nguồn với ESLint
├── index.html                            # File HTML gốc nạp ứng dụng React
├── package.json                          # Khai báo dependencies (react, react-router-dom, react-icons, classnames, sass...) và scripts
├── package-lock.json                     # Khóa phiên bản chi tiết các package dependencies
├── srcTree.md                            # Tài liệu mô tả cây thư mục dự án
└── vite.config.js                        # Cấu hình Vite bundler và plugin React
```

---

## 🎯 Luồng hoạt động chính (Data & Component Flow)

1. **`main.jsx`**: Nạp `BrowserRouter`, import `index.scss` và render `<App />`.
2. **`App.jsx`**: Gọi `<RootLayout>` và truyền `<AppRouter />` làm `children`.
3. **`RootLayout.jsx`**:
   - Hiển thị `<HeaderLayout />` $\rightarrow$ `<Navbar />` (đọc menu từ `navLinks` trong `src/constant/path.js`).
   - Hiển thị `<main>` chứa nội dung động do `<AppRouter />` quyết định dựa trên URL hiện tại.
   - Hiển thị `<Footer />`.
4. **`Routers.jsx`**: Đọc danh sách cấu hình `routes` từ `src/constant/path.js` để render component tương ứng:
   - `/` $\rightarrow$ `LandingPage` (gồm component `Banner` và `NewArrivals`).
   - `/shop` $\rightarrow$ `Shop`
   - `/onSale` $\rightarrow$ `OnSale`
   - `/newArrivals` $\rightarrow$ `NewArrivals`
   - `/brands` $\rightarrow$ `Brands`
5. **Dữ liệu sản phẩm & Component `NewArrivals`**:
   - Lấy mảng dữ liệu `products` từ `src/constant/productData.js`.
   - Lọc các sản phẩm có tag `'new'` (`product.tag.includes('new')`).
   - Sử dụng state `visibleCount` để điều khiển số lượng sản phẩm hiển thị (mặc định 8 sản phẩm, bấm **View All** để hiển thị tất cả, bấm **Reset** để quay về 8 sản phẩm).
   - Render danh sách thông qua component tái sử dụng `<ProductCard />`.
