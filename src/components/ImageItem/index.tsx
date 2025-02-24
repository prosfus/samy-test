import { ImagePrice } from "./components/ImagePrice";
import { ImageLikes } from "./components/ImageLikes";
import { ImageDetails } from "./components/ImageDetails";
import { ImageNode } from "../../models/ImageNode";

export interface ImageItemProps {
  node: ImageNode;
  itemWidth: number;
  smallView: boolean;
  ITEM_HEIGHT: number;
  handleLike: (node: ImageNode) => void;
}

export const ImageItem = ({
  node,
  itemWidth,
  smallView,
  ITEM_HEIGHT,
  handleLike,
}: ImageItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: `${ITEM_HEIGHT - 20}px`,
        boxSizing: "border-box",
        border: "1px solid #d3d3d3",
        width: itemWidth,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={node.picture}
        alt={node.title}
        style={{
          height: "360px",
          width: "100%",
          objectFit: "cover",
        }}
      />

      {!smallView && <ImagePrice price={node.price} smallView={false} />}
      {!smallView && (
        <ImageLikes node={node} smallView={false} handleLike={handleLike} />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          flexBasis: 0,
          width: "100%",
        }}
      >
        <ImageDetails
          title={node.title}
          author={node.author}
          itemWidth={itemWidth}
        />

        {smallView && (
          <div
            style={{
              height: 59,
              borderTop: "1px solid #d3d3d3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <ImageLikes node={node} smallView={true} handleLike={handleLike} />
            <ImagePrice price={node.price} smallView={true} />
          </div>
        )}
      </div>
    </div>
  );
};
