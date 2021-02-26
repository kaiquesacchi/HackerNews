import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

import { LinkList, iData } from "../components/LinkList";

import * as SC from "../styles/search.styles";
import Header from "../components/Header";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export default function Search() {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { error, loading, data }] = useLazyQuery<iData>(FEED_SEARCH_QUERY);

  return (
    <SC.Container>
      <Header />
      <SC.Form
        onSubmit={(e) => {
          e.preventDefault();
          executeSearch({
            variables: { filter: searchFilter },
          });
        }}>
        <SC.Title>Search</SC.Title>
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button type="submit">OK</button>
      </SC.Form>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <LinkList data={data} />}
    </SC.Container>
  );
}
