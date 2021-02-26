import React, { useEffect, useState } from "react";
import { ApolloContext } from "../context/Apollo";

interface iProps {
  Component: any;
  pageProps: any;
}
export default function App({ Component, pageProps }: iProps) {
  return (
    <ApolloContext initialState={pageProps.initialApolloState}>
      <Component {...pageProps} />
    </ApolloContext>
  );
}
