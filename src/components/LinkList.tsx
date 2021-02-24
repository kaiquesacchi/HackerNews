import React from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

interface iFeed {
  feed: {
    id: number;
    links: {
      id: number;
      createdAt: Date;
      url: string;
      description: string;
    }[];
  };
}

export default function LinkList() {
  const { data } = useQuery<iFeed>(FEED_QUERY);

  return <div>{data && data.feed.links.map((link) => <Link key={link.id} link={link} />)}</div>;
}
