import { useState } from 'react';

import { sizeList } from '../constant/masterData';

const buildFilterKey = (filters) =>
    `${filters.minPrice}:${filters.maxPrice}|${filters.sizes.join(',')}`;

const useFilterDraft = (filters, applyFilters) => {
    const filterKey = buildFilterKey(filters);

    const [priceDraft, setPriceDraft] = useState({
        key: filterKey,
        range: [filters.minPrice, filters.maxPrice],
    });
    const [sizeDraft, setSizeDraft] = useState({
        key: filterKey,
        sizes: filters.sizes,
    });

    const priceRange =
        priceDraft.key === filterKey
            ? priceDraft.range
            : [filters.minPrice, filters.maxPrice];
    const selectedSizes = sizeDraft.key === filterKey ? sizeDraft.sizes : filters.sizes;

    const selectedSizesKey = sizeList
        .filter((size) => selectedSizes.includes(size))
        .join(',');
    const filtersSizesKey = sizeList
        .filter((size) => filters.sizes.includes(size))
        .join(',');
    const isDirty =
        priceRange[0] !== filters.minPrice ||
        priceRange[1] !== filters.maxPrice ||
        selectedSizesKey !== filtersSizesKey;

    const setPriceRange = (range) => {
        setPriceDraft({ key: filterKey, range });
    };

    const toggleSize = (size) => {
        setSizeDraft({
            key: filterKey,
            sizes: selectedSizes.includes(size)
                ? selectedSizes.filter((selected) => selected !== size)
                : [...selectedSizes, size],
        });
    };

    const applyDraft = () => {
        const applied = applyFilters({
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            sizes: selectedSizes,
        });

        if (!applied) return;

        const nextKey = buildFilterKey(applied);
        setPriceDraft({
            key: nextKey,
            range: [applied.minPrice, applied.maxPrice],
        });
        setSizeDraft({ key: nextKey, sizes: applied.sizes });
    };

    const resetDraft = () => {
        setPriceDraft({
            key: filterKey,
            range: [filters.minPrice, filters.maxPrice],
        });
        setSizeDraft({ key: filterKey, sizes: filters.sizes });
    };

    return {
        priceRange,
        selectedSizes,
        isDirty,
        setPriceRange,
        toggleSize,
        applyDraft,
        resetDraft,
    };
};

export default useFilterDraft;
