// Một chỗ duy nhất cấu hình & gọi API backend cho toàn bộ client.
// Có thể override bằng biến môi trường VITE_API_URL trong client/.env
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

// Chuẩn hoá URL ảnh: API trả đường dẫn tương đối ("/upload/P001.jpg"),
// còn dữ liệu khác có thể trả URL đầy đủ hoặc data URI.
export const resolveImageUrl = (url) => {
    if (!url) return null;
    if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url;

    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const request = async (path, params = {}, { signal } = {}) => {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item !== undefined && item !== null && item !== '') {
                    search.append(key, String(item));
                }
            });
            return;
        }

        if (value !== undefined && value !== null && value !== '') {
            search.set(key, String(value));
        }
    });

    const query = search.toString();
    const response = await fetch(`${API_BASE_URL}${path}${query ? `?${query}` : ''}`, { signal });

    if (!response.ok) {
        throw new Error(`GET ${path} thất bại (HTTP ${response.status})`);
    }

    return response.json();
};

// GET /api/v1/products?tag=&minPrice=&maxPrice=&size=&size=&limit=&skip=
// Trả về { products: [{ ...product, tags: string[] }], meta, skip }
export const getProducts = ({
    tag,
    minPrice,
    maxPrice,
    size,
    limit = 9,
    skip = 0,
    signal,
} = {}) =>
    request('/api/v1/products', { tag, minPrice, maxPrice, size, limit, skip }, { signal });
