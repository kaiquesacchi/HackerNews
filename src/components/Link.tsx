import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants";
import { timeDifferenceForDate } from "../utils/dateTime";
import { FEED_QUERY, iFeedQuery } from "./LinkList";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

interface iProps {
  link: {
    id: number;
    description: string;
    url: string;
    votes: {
      id: number;
      user: {
        id: number;
      };
    }[];
    postedBy?: {
      id: number;
      name: string;
    };
    createdAt: Date;
  };
  index: number;
}

export default function Link({ link, index }: iProps) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: "desc" };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { post } }) => {
      const data = cache.readQuery<iFeedQuery>({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      if (data === null) return;

      const updatedLinks = data.feed.links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
        variables: {
          take,
          skip,
          orderBy,
        },
      });
    },
    onCompleted: () => history.push("/new/1"),
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" style={{ cursor: "pointer" }} onClick={() => vote()}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
}
