import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
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

export const LIKE_IMAGE = gql`
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
