// createAuthLink.js

import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { refreshToken, getAccessToken } from './tokenService';

export const createAuthLink = () => {
  const authLink = setContext(async (_, { headers }) => {
    const token = getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
          return refreshToken()
            .then(newToken => {
              const headers = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...headers,
                  authorization: `Bearer ${newToken}`
                }
              });

              return forward(operation);
            })
            .catch(error => {
              console.error("Token refresh failed", error);
              return;
            });
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  return authLink.concat(errorLink);
};
