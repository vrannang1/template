import { gql } from '@apollo/client';

export const BOOKMARK_JOB = gql`
  mutation BookmarkJob($input: BookmarkInput!) {
    createBookmark(input: $input) {
      id
    }
  }
`;

export const DELETE_BOOKMARK = gql`
  mutation DeleteBookmark($id: String!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`;

export const CREATE_SEARCH = gql`
  mutation CreateSearch($input: SearchInput!) {
    createSearch(input: $input) {
      id
      query
    }
  }
`;

export const UPDATE_USER_TAGS = gql`
  mutation UpdateUserTags($input: UpdateUserTagsInput!) {
    updateUserTags(input: $input) {
      id
      tags
    }
  }
`;

export const GET_RECOMMENDED_JOBS = gql`
  query GetRecommendedJobs($userId: String!, $limit: Int, $offset: Int) {
    recommendedJobs(userId: $userId, limit: $limit, offset: $offset) {
      id
      title
      tags
      slug
      bookmarked
      bookmarkId
      companyName
      jobLocation
      description
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query FetchUser {
    me {
      id
      firstName
      lastName
      gravatarMd5
      email
      role
      tags
      userProfile {
        location
        bio
        education {
          degree
          college
          start_date
          end_date
          currently_studying
        }
        experience {
          title
          company
          start_date
          end_date
          responsibilities
          current
        }
      }
    }
  }
`;

export const GET_JOB_OPTIONS_QUERY = gql`
  query GetJobOptions {
    jobOptions {
      jobTypes
      categories
      statuses
    }
  }
`;