import { ImageNode } from "../../ImagesList";
import { HearthIcon } from "../../HearthIcon";

interface ImageLikesProps {
  node: ImageNode;
  smallView: boolean;
  handleLike: (node: ImageNode) => void;
}

export const ImageLikes = ({
  node,
  smallView,
  handleLike,
}: ImageLikesProps) => {
  const isLiked = node.liked;

  if (smallView) {
    return (
      <div
        style={{
          width: "50%",
          borderRight: "1px solid #d3d3d3",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div
          onClick={() => handleLike(node)}
          style={{
            height: "24px",
            width: "24px",
          }}
        >
          <HearthIcon
            fill={isLiked ? "red" : "none"}
            stroke={isLiked ? "white" : "gray"}
          />
        </div>
        {node.likesCount}
      </div>
    );
  }

  return (
    <div
      style={{
        transformOrigin: "top",
        position: "absolute",
        top: 360,
        transform: "translateY(-100%)",
        right: 0,
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
        gap: 5,
        flexDirection: "column",
        padding: "40px 20px 20px 20px",
        width: "100%",
        background: "linear-gradient(to top, black, transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <div
          onClick={() => handleLike(node)}
          style={{
            height: "24px",
            width: "24px",
          }}
        >
          <HearthIcon
            fill={isLiked ? "red" : "none"}
            stroke={isLiked ? "none" : "white"}
          />
        </div>
        <span style={{ color: "white" }}>{node.likesCount}</span>
      </div>
    </div>
  );
};
