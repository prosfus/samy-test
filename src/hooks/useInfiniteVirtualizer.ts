import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface UseInfiniteVirtualizerProps {
  totalItems: number;
  columns: number;
  hasNextPage: boolean;
  loadMore: () => void;
  itemHeight: number;
  extraRows?: number;
}

export function useInfiniteVirtualizer({
  totalItems,
  columns,
  hasNextPage,
  loadMore,
  itemHeight,
  extraRows = 3,
}: UseInfiniteVirtualizerProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowsCount = Math.ceil(totalItems / columns);
  const totalRows = hasNextPage ? rowsCount + extraRows : rowsCount;

  const virtualizer = useVirtualizer({
    count: totalRows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: extraRows,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const lastIndex = virtualItems[virtualItems.length - 1]?.index;

  useEffect(() => {
    if (hasNextPage && lastIndex !== undefined && lastIndex >= rowsCount) {
      loadMore();
    }
  }, [lastIndex, hasNextPage, rowsCount, loadMore]);

  return { parentRef, virtualizer, rowsCount };
}
