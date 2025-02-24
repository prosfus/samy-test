import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";
import ImagesList from "../components/ImagesList";

// Creamos un spy para fetchMore
const fetchMoreSpy = vi.fn();

vi.mock("../hooks/useImagesQuery", () => ({
  useImagesQuery: () => ({
    data: {
      images: {
        edges: [
          {
            node: {
              id: "1",
              title: "Test Image",
              picture: "http://example.com/image.jpg",
              likesCount: 10,
              liked: false,
              price: 20,
              author: "Test Author",
            },
          },
        ],
        pageInfo: { endCursor: "cursor", hasNextPage: true },
        __typename: "Images",
      },
    },
    loading: false,
    error: null,
    fetchMore: fetchMoreSpy,
    handleLike: () => {},
    handleLoadMore: () => fetchMoreSpy(),
  }),
}));

vi.mock("../hooks/useVirtualizedLayout", () => ({
  useVirtualizedLayout: (params: {
    handleLoadMore: () => void;
    data: unknown;
  }) => {
    const parentRef = (node: HTMLDivElement | null) => {
      if (node) {
        node.addEventListener("scroll", params.handleLoadMore);
      }
    };
    return {
      parentRef,
      virtualizer: {
        getTotalSize: () => 1000,
        getVirtualItems: () => [{ index: 0, key: "item-0", start: 0 }],
      },
      layoutConfig: {
        columns: 1,
        itemWidth: 300,
        ITEM_HEIGHT: 460,
        smallView: false,
      },
      totalItems: 1,
    };
  },
}));

describe("ImagesList", () => {
  it("llama fetchMore cuando el usuario hace scroll", () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ImagesList />
      </MockedProvider>
    );

    const container = getByTestId("images-list-container");

    fireEvent.scroll(container, { target: { scrollTop: 500 } });

    expect(fetchMoreSpy).toHaveBeenCalled();
  });
});
