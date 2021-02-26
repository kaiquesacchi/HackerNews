import React, { useEffect, useMemo, useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { AUTH_TOKEN } from "../constants";

interface iDefinintion {
  kind: string;
  operation?: string;
}

function createApolloClient(authToken: string | null, initialState: any) {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : "",
      },
    };
  });

  const wsLink =
    typeof window === "undefined"
      ? null
      : new WebSocketLink({
          uri: `ws://localhost:4000/graphql`,
          options: {
            reconnect: true,
            connectionParams: {
              authToken: authToken,
            },
          },
        });

  const link = wsLink
    ? split(
        ({ query }) => {
          const { kind, operation }: iDefinintion = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}

// export function initializeApollo(authToken: string | null, initialState = {}) {
//   const _apolloClient = apolloClient ?? createApolloClient(authToken);

//   // If your page has Next.js data fetching methods that use Apollo Client,
//   // the initial state gets hydrated here
//   if (initialState) {
//     // Get existing cache, loaded during client side data fetching
//     const existingCache = _apolloClient.extract();

//     // Restore the cache using the data passed from
//     // getStaticProps/getServerSideProps combined with the existing cached data
//     _apolloClient.cache.restore({ ...existingCache, ...initialState });
//   }

//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === "undefined") return _apolloClient;

//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;
//   return _apolloClient;
// }

interface iProps {
  initialState: any;
  children: React.ReactNode;
}

export function ApolloContext({ initialState, children }: iProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN));
  }, [setAuthToken]);
  const store = createApolloClient(authToken, initialState);
  // const store = useMemo(() => initializeApollo(authToken, initialState), [authToken, initialState]);

  return <ApolloProvider client={store}>{children}</ApolloProvider>;
}
