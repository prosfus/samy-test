import { ImageNode } from "../ImagesList";

export interface ImageItemProps {
  node: ImageNode;
  itemWidth: number;
  smallView: boolean;
  ITEM_HEIGHT: number;
  handleLike: (node: ImageNode) => void;
}
