import { useImagesQuery } from "../hooks/useImagesQuery";
import { useVirtualizedLayout } from "../hooks/useVirtualizedLayout";
import { ImageItem } from "./ImageItem";

export interface ImageNode {
  id: string;
  title: string;
  picture: string;
  likesCount: number;
  liked: boolean;
  price: number;
  author: string;
}

const ImagesList = () => {
  const { data, loading, error, handleLoadMore, handleLike } = useImagesQuery();
  const { parentRef, virtualizer, layoutConfig, totalItems } =
    useVirtualizedLayout({
      data,
      handleLoadMore,
    });

  if (loading && !data) return null;
  if (error) return null;

  return (
    <div
      ref={parentRef}
      style={{
        flex: 1,
        width: "100%",
        overflowY: "auto",
        padding: "20px 0px",
        backgroundColor: "#f6f6f6",
        position: "relative",
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * layoutConfig.columns;
          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${layoutConfig.ITEM_HEIGHT}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${layoutConfig.columns}, ${layoutConfig.itemWidth}px)`,
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                {Array.from({ length: layoutConfig.columns }).map(
                  (_, colIndex) => {
                    const index = startIndex + colIndex;
                    if (index >= totalItems) {
                      return (
                        <div
                          key={colIndex}
                          style={{
                            width: layoutConfig.itemWidth,
                            height: "460px",
                          }}
                        />
                      );
                    }
                    const node: ImageNode = data.images.edges[index].node;
                    return (
                      <ImageItem
                        key={node.id}
                        node={node}
                        itemWidth={layoutConfig.itemWidth}
                        smallView={layoutConfig.smallView}
                        ITEM_HEIGHT={layoutConfig.ITEM_HEIGHT}
                        handleLike={handleLike}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagesList;
