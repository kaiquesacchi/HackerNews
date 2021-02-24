import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <div></div>
  </ApolloProvider>,
  document.getElementById("root")
);
