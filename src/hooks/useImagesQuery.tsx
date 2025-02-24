import { gql, useMutation } from "@apollo/client";

import { useReactiveVar } from "@apollo/client";

import { useQuery } from "@apollo/client";
import { filterVar } from "../main";
import { ImageNode } from "../components/ImagesList";

const GET_IMAGES = gql`
  query GetImages($after: String, $first: Int, $title: String) {
    images(after: $after, first: $first, title: $title) {
      edges {
        cursor
        node {
          id
          title
          picture
          likesCount
          liked
          price
          author
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const LIKE_IMAGE = gql`
  mutation LikeImage($input: LikeImageInput!) {
    likeImage(input: $input) {
      clientMutationId
      image {
        id
        liked
        likesCount
      }
    }
  }
`;

export interface ImagesData {
  images: {
    __typename: string;
    edges: Array<{ node: ImageNode }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export const useImagesQuery = () => {
  const { search } = useReactiveVar(filterVar);
  const { data, loading, error, fetchMore } = useQuery(GET_IMAGES, {
    variables: { first: 10, after: null, title: search },
    notifyOnNetworkStatusChange: true,
  });

  const [likeImageMutation] = useMutation(LIKE_IMAGE);

  const handleLike = (node: ImageNode) => {
    likeImageMutation({
      variables: { input: { imageId: node.id } },
      optimisticResponse: {
        likeImage: {
          __typename: "LikeImagePayload",
          clientMutationId: null,
          image: {
            __typename: "Image",
            id: node.id,
            liked: !node.liked,
            likesCount: node.liked ? node.likesCount - 1 : node.likesCount + 1,
          },
        },
      },
      update: (cache, { data: { likeImage } }) => {
        cache.modify({
          id: cache.identify(likeImage.image),
          fields: {
            liked() {
              return likeImage.image.liked;
            },
            likesCount() {
              return likeImage.image.likesCount;
            },
          },
        });
      },
    });
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        after: data.images.pageInfo.endCursor,
      },
      updateQuery: (
        prevResult: ImagesData,
        { fetchMoreResult }: { fetchMoreResult: ImagesData | undefined }
      ) => {
        if (!fetchMoreResult) return prevResult;
        return {
          images: {
            __typename: prevResult.images.__typename,
            edges: [
              ...prevResult.images.edges,
              ...fetchMoreResult.images.edges,
            ],
            pageInfo: fetchMoreResult.images.pageInfo,
          },
        };
      },
    });
  };

  return { data, loading, error, fetchMore, handleLike, handleLoadMore };
};
