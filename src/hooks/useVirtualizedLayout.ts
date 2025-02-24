import { useState, useEffect, useCallback } from "react";
import { useInfiniteVirtualizer } from "./useInfiniteVirtualizer";
import { ImagesData } from "./useImagesQuery";

interface UseVirtualizedLayoutProps {
  data: ImagesData | undefined;
  handleLoadMore: () => void;
  extraRows?: number;
}

interface LayoutConfig {
  itemWidth: number;
  columns: number;
  smallView: boolean;
  ITEM_HEIGHT: number;
}

const extraRows = 3;

export const useVirtualizedLayout = ({
  data,
  handleLoadMore,
}: UseVirtualizedLayoutProps) => {
  const initialItemWidth =
    typeof window !== "undefined" && window.innerWidth > 420 ? 400 : 350;
  const [itemWidth, setItemWidth] = useState(initialItemWidth);
  const [columns, setColumns] = useState(() => {
    if (typeof window !== "undefined") {
      return Math.floor((window.innerWidth - 250) / initialItemWidth) || 1;
    }
    return 1;
  });

  const smallView = columns <= 2;
  const ITEM_HEIGHT = smallView ? 529 : 480;

  useEffect(() => {
    const updateLayout = () => {
      if (typeof window === "undefined") return;

      const containerWidth = window.innerWidth;
      const newItemWidth = containerWidth > 420 ? 400 : 350;
      setItemWidth(newItemWidth);

      const colCount = Math.floor((containerWidth - 250) / newItemWidth) || 1;
      setColumns(colCount);
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const loadMore = useCallback(() => {
    if (data && data.images.pageInfo.hasNextPage) {
      handleLoadMore();
    }
  }, [data, handleLoadMore]);

  const totalItems = data ? data.images.edges.length : 0;
  const { parentRef, virtualizer } = useInfiniteVirtualizer({
    totalItems,
    columns,
    hasNextPage: data ? data.images.pageInfo.hasNextPage : false,
    loadMore,
    itemHeight: ITEM_HEIGHT,
    extraRows,
  });

  const layoutConfig: LayoutConfig = {
    itemWidth,
    columns,
    smallView,
    ITEM_HEIGHT,
  };

  return {
    parentRef,
    virtualizer,
    layoutConfig,
    totalItems,
  };
};
