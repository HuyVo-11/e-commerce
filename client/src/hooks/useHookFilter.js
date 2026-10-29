import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { sizeList } from '../constant/masterData';

const PRICE_MIN = 0;
const PRICE_MAX = 250;
const PRICE_PATTERN = /^\d+(?:\.\d+)?$/;

// Đọc giá từ URL; trả null nếu không truyền hoặc không hợp lệ
const parsePriceParam = (value) => {
    if (value === null) return null;

    const trimmed = value.trim();

    if (!PRICE_PATTERN.test(trimmed)) return null;

    return Number(trimmed);
};

const useHookFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const rawMinPrice = parsePriceParam(searchParams.get('minPrice'));
    const rawMaxPrice = parsePriceParam(searchParams.get('maxPrice'));
    const hasInvalidPriceRange =
        rawMinPrice !== null && rawMaxPrice !== null && rawMinPrice > rawMaxPrice;

    const urlMinPrice = Math.min(Math.max(rawMinPrice ?? PRICE_MIN, PRICE_MIN), PRICE_MAX);
    const urlMaxPrice = Math.min(Math.max(rawMaxPrice ?? PRICE_MAX, PRICE_MIN), PRICE_MAX);
    const urlPriceRange = [
        Math.min(urlMinPrice, urlMaxPrice),
        Math.max(urlMinPrice, urlMaxPrice),
    ];
    const urlPriceKey = `${urlPriceRange[0]}:${urlPriceRange[1]}`;

    // Draft chỉ có hiệu lực khi URL chưa đổi; URL đổi (Apply/back/forward)
    // thì slider tự lấy giá trị mới, không cần setState trong useEffect.
    const [priceDraft, setPriceDraft] = useState({
        key: urlPriceKey,
        range: urlPriceRange,
    });
    const priceRange = priceDraft.key === urlPriceKey ? priceDraft.range : urlPriceRange;

    const handlePriceChange = (range) => {
        setPriceDraft({ key: urlPriceKey, range });
    };

    const rawSizes = searchParams
        .getAll('size')
        .map((value) => value.trim())
        .filter(Boolean);
    const invalidSizes = [...new Set(rawSizes.filter((value) => !sizeList.includes(value)))];
    const urlSizes = [...new Set(rawSizes.filter((value) => sizeList.includes(value)))];
    const urlSizeKey = urlSizes.join(',');
    const hasInvalidSize = invalidSizes.length > 0;

    const [sizeDraft, setSizeDraft] = useState({
        key: urlSizeKey,
        sizes: urlSizes,
    });
    const [isSizeOpen, setIsSizeOpen] = useState(true);
    const selectedSizes = sizeDraft.key === urlSizeKey ? sizeDraft.sizes : urlSizes;

    const toggleSize = (size) => {
        setSizeDraft({
            key: urlSizeKey,
            sizes: selectedSizes.includes(size)
                ? selectedSizes.filter((selected) => selected !== size)
                : [...selectedSizes, size],
        });
    };

    const toggleSizeOpen = () => {
        setIsSizeOpen((prev) => !prev);
    };

    const applyFilters = () => {
        const [minPrice, maxPrice] = priceRange;
        const nextSearchParams = new URLSearchParams(searchParams);

        nextSearchParams.set('minPrice', String(minPrice));
        nextSearchParams.set('maxPrice', String(maxPrice));

        const orderedSizes = sizeList.filter((size) => selectedSizes.includes(size));

        nextSearchParams.delete('size');
        orderedSizes.forEach((size) => nextSearchParams.append('size', size));

        // Đồng bộ draft với URL mới để back/forward không khôi phục lựa chọn cũ
        setSizeDraft({ key: orderedSizes.join(','), sizes: orderedSizes });

        // Đổi filter phải quay về trang đầu
        nextSearchParams.set('page', '0');
        setSearchParams(nextSearchParams);
    };

    return {
        // Price UI
        priceRange,
        priceMin: PRICE_MIN,
        priceMax: PRICE_MAX,
        handlePriceChange,

        // Size UI
        sizeOptions: sizeList,
        selectedSizes,
        toggleSize,
        isSizeOpen,
        toggleSizeOpen,

        // Apply
        applyFilters,

        // Giá trị URL/validation dùng cho ProductList
        minPrice: rawMinPrice ?? undefined,
        maxPrice: rawMaxPrice ?? undefined,
        sizesKey: urlSizeKey,
        hasInvalidPriceRange,
        hasInvalidSize,
        invalidSizes,
        hasInvalidFilter: hasInvalidPriceRange || hasInvalidSize,
    };
};

export default useHookFilter;
