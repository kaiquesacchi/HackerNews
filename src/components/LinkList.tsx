import React from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";

export const FEED_QUERY = gql`
  {
    feed {
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
    }
  }
`;

export interface iFeedQuery {
  feed: {
    id: number;
    links: {
      id: number;
      createdAt: Date;
      url: string;
      description: string;
      postedBy?: {
        id: number;
        name: string;
      };
      votes: {
        id: number;
        user: {
          id: number;
        };
      }[];
    }[];
  };
}

export default function LinkList() {
  const { data } = useQuery<iFeedQuery>(FEED_QUERY);

  return <div>{data && data.feed.links.map((link, index) => <Link key={link.id} link={link} index={index} />)}</div>;
}
