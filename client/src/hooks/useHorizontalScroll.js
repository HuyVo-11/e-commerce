import { useEffect, useMemo, useRef } from "react";

const useHorizontalScroll = (dataAttribute, data = [], repeatCount = 3) => {
    const listRef = useRef(null);

    // Tối ưu tạo data lặp lại: tránh render lại không cần thiết và tạo unique key
    const cloneData = useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) return [];
        return Array.from({ length: repeatCount }, (_, copyIndex) =>
            data.map((item, itemIndex) => ({
                ...item,
                _cloneKey: `${item.id ?? itemIndex}-copy-${copyIndex}`,
            }))
        ).flat();
    }, [data, repeatCount]);

    const handleScroll = () => {
        if (!listRef.current) return;
        const list = listRef.current;
        const oneSetWidth = list.scrollWidth / repeatCount;

        // Nếu cuộn qua bộ giữa sang bộ cuối -> Nhảy lùi về bộ giữa
        if (list.scrollLeft >= oneSetWidth * (repeatCount - 1)) {
            list.scrollLeft -= oneSetWidth;
        }
        // Nếu cuộn lùi về đầu -> Nhảy tiến lên bộ giữa
        else if (list.scrollLeft <= 0) {
            list.scrollLeft += oneSetWidth;
        }
    };

    const scroll = (direction) => {

        const list = listRef.current;
        if (!list) return;

        const selector = dataAttribute

        const card = list.querySelector(selector);
        if (!card) return;

        const gap = 12;
        const distance = card.offsetWidth + gap;

        list.scrollBy({
            left: direction === "right" ? distance : -distance,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        if (!listRef.current) return;
        const list = listRef.current;
        const oneSetWidth = list.scrollWidth / repeatCount;
        list.scrollLeft = oneSetWidth;
    }, [cloneData, repeatCount]);

    return {
        handleScroll,
        listRef,
        cloneData,
        scroll,
    }
}
export default useHorizontalScroll;