// tokenService.js

import Cookies from 'js-cookie';
import { gql, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const API_ENDPOINT = "http://localhost:4000/api";

const client = new ApolloClient({
  link: createHttpLink({ uri: API_ENDPOINT }),
  cache: new InMemoryCache()
});

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
    }
  }
`;

export const getAccessToken = () => Cookies.get('auth-token');

export const refreshToken = async () => {
  const refreshToken = Cookies.get('refresh-token');
  
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { token: refreshToken }
    });

    const newToken = data.refreshToken.token;
    Cookies.set('auth-token', newToken, { secure: true, sameSite: 'Strict' });
    return newToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};
