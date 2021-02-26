import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { LinkList, iData } from "../../components/LinkList";

import { LINKS_PER_PAGE } from "../../constants";

export const FEED_QUERY = gql`
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description
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
      count
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!router || !setPage || !router.query.page) return;
    const page = Number(router.query.page);
    if (isNaN(page)) router.replace({ pathname: "/", query: { page: 1 } });
    setPage(page);
  }, [router, setPage]);

  const { data, loading, error, subscribeToMore } = useQuery<iData>(FEED_QUERY, {
    variables: {
      skip: (page - 1) * LINKS_PER_PAGE,
      take: LINKS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    },
  });

  return (
    <div>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <LinkList page={page} data={data} />}
      {data && <Footer page={page} lastPage={data?.feed.count / LINKS_PER_PAGE} />}
    </div>
  );
}
