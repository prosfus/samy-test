import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImageLikes } from "../components/ImageItem/components/ImageLikes";

const TestImageLikes = () => {
  const [image, setImage] = React.useState({
    id: "1",
    title: "Test Image",
    picture: "http://example.com/image.jpg",
    likesCount: 10,
    liked: false,
    price: 20,
    author: "Test Author",
  });

  const handleLike = (node: typeof image) => {
    const newLiked = !node.liked;
    const newLikes = newLiked ? node.likesCount + 1 : node.likesCount - 1;
    setImage({ ...node, liked: newLiked, likesCount: newLikes });
  };

  return (
    <div data-testid="image-likes">
      <ImageLikes node={image} smallView={true} handleLike={handleLike} />
    </div>
  );
};

describe("ImageLikes", () => {
  it("incrementa el número de likes al hacer click en el botón", () => {
    const { getByTestId } = render(<TestImageLikes />);
    const container = getByTestId("image-likes");

    const likeButton = container.querySelector("svg");
    expect(likeButton).not.toBeNull();

    if (likeButton) {
      fireEvent.click(likeButton);
      expect(container.textContent).toContain("11");

      fireEvent.click(likeButton);
      expect(container.textContent).toContain("10");
    }
  });
});
