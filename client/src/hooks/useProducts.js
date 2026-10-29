import { useEffect, useState } from 'react';

import { getProducts } from '../services/api';

const EMPTY_SIZES = [];

const useProducts = ({ filters, page = 1, limit = 9, enabled = true } = {}) => {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const { minPrice, maxPrice } = filters ?? {};
    const sizes = filters?.sizes ?? EMPTY_SIZES;

    useEffect(() => {
        if (!enabled) return;

        const controller = new AbortController();

        const fetchProducts = async () => {
            setIsLoading(true);
            setError(false);

            try {
                const data = await getProducts({
                    minPrice,
                    maxPrice,
                    size: sizes.length > 0 ? sizes : undefined,
                    limit,
                    skip: (page - 1) * limit,
                    signal: controller.signal,
                });

                if (controller.signal.aborted) return;

                setProducts(data.products ?? []);
                setMeta(data.meta ?? null);
            } catch (err) {
                if (controller.signal.aborted || err?.name === 'AbortError') return;

                setProducts([]);
                setMeta(null);
                setError(true);
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        };

        fetchProducts();

        return () => controller.abort();
    }, [enabled, minPrice, maxPrice, sizes, page, limit]);

    return {
        products: enabled ? products : [],
        meta: enabled ? meta : null,
        isLoading: enabled ? isLoading : false,
        error: enabled ? error : false,
    };
};

export default useProducts;
