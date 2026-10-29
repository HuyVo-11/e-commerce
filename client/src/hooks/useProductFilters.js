import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { sizeList } from '../constant/masterData';

const PRICE_MIN = 0;
const PRICE_MAX = 250;
const PRICE_PATTERN = /^\d+(?:\.\d+)?$/;
const FIRST_PAGE = 1;

// Đọc giá từ URL; trả null nếu không truyền hoặc không hợp lệ
const parsePriceParam = (value) => {
    if (value === null) return null;

    const trimmed = value.trim();

    if (!PRICE_PATTERN.test(trimmed)) return null;

    return Number(trimmed);
};

const clampPrice = (value, fallback) => {
    const normalized = value ?? fallback;

    return Math.min(Math.max(normalized, PRICE_MIN), PRICE_MAX);
};

const useProductFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const rawMinPrice = parsePriceParam(searchParams.get('minPrice'));
    const rawMaxPrice = parsePriceParam(searchParams.get('maxPrice'));
    const hasInvalidPriceRange =
        rawMinPrice !== null && rawMaxPrice !== null && rawMinPrice > rawMaxPrice;

    const clampedMinPrice = clampPrice(rawMinPrice, PRICE_MIN);
    const clampedMaxPrice = clampPrice(rawMaxPrice, PRICE_MAX);
    const minPrice = Math.min(clampedMinPrice, clampedMaxPrice);
    const maxPrice = Math.max(clampedMinPrice, clampedMaxPrice);

    const rawSizes = searchParams
        .getAll('size')
        .map((value) => value.trim())
        .filter(Boolean);
    const invalidSizes = [...new Set(rawSizes.filter((value) => !sizeList.includes(value)))];
    const validSizes = new Set(rawSizes.filter((value) => sizeList.includes(value)));
    const sizes = sizeList.filter((size) => validSizes.has(size));
    const sizesKey = sizes.join(',');
    const hasInvalidSize = invalidSizes.length > 0;

    const filters = useMemo(
        () => ({
            minPrice,
            maxPrice,
            sizes: sizesKey ? sizesKey.split(',') : [],
        }),
        [minPrice, maxPrice, sizesKey]
    );

    const errors = {
        price: hasInvalidPriceRange ? { min: rawMinPrice, max: rawMaxPrice } : null,
        sizes: hasInvalidSize ? { invalid: invalidSizes, allowed: sizeList } : null,
    };
    const isValid = !errors.price && !errors.sizes;
    const filterKey = `${minPrice}:${maxPrice}|${sizesKey}`;

    const applyFilters = ({
        minPrice: nextMinPrice,
        maxPrice: nextMaxPrice,
        sizes: nextSizes = [],
    } = {}) => {
        const clampedNextMin = clampPrice(nextMinPrice, PRICE_MIN);
        const clampedNextMax = clampPrice(nextMaxPrice, PRICE_MAX);
        const appliedMin = Math.min(clampedNextMin, clampedNextMax);
        const appliedMax = Math.max(clampedNextMin, clampedNextMax);
        const requestedSizes = Array.isArray(nextSizes) ? nextSizes : [];
        const appliedSizes = sizeList.filter((size) => requestedSizes.includes(size));

        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set('minPrice', String(appliedMin));
        nextSearchParams.set('maxPrice', String(appliedMax));
        nextSearchParams.delete('size');
        appliedSizes.forEach((size) => nextSearchParams.append('size', size));
        nextSearchParams.set('page', String(FIRST_PAGE));
        setSearchParams(nextSearchParams);

        return { minPrice: appliedMin, maxPrice: appliedMax, sizes: appliedSizes };
    };

    const clearFilters = () => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.delete('minPrice');
        nextSearchParams.delete('maxPrice');
        nextSearchParams.delete('size');
        nextSearchParams.set('page', String(FIRST_PAGE));
        setSearchParams(nextSearchParams);
    };

    return {
        filters,
        errors,
        isValid,
        filterKey,
        priceBounds: { min: PRICE_MIN, max: PRICE_MAX },
        sizeOptions: sizeList,
        applyFilters,
        clearFilters,
    };
};

export default useProductFilters;
