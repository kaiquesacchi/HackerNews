import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../../constants";
import { timeDifferenceForDate } from "../../utils/dateTime";
import { iData, iLink } from "./LinkList";
import { FEED_QUERY } from "../../pages/new/[page]";
import { useRouter } from "next/router";

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
  link: iLink;
  index: number;
}

export default function Link({ link, index }: iProps) {
  const router = useRouter();

  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN));
  }, []);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: "desc" };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { post } }) => {
      const data = cache.readQuery<iData>({
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
    onCompleted: () => router.push("/new/1"),
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
