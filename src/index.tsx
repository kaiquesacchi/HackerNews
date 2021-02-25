import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "./constants";

import { BrowserRouter } from "react-router-dom";
import Router from "./pages";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
