import React from "react";
import { LinkItem } from ".";
import { LINKS_PER_PAGE } from "../../constants";

export interface iLink {
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
}

export interface iData {
  feed: {
    id: number;
    links: iLink[];
    count: number;
  };
}

interface iProps {
  data: iData;
  page: number;
}

export default function LinkList({ data, page }: iProps) {
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
  return (
    <div>
      {data.feed.links.map((link, index) => (
        <LinkItem key={link.id} link={link} index={index + pageIndex} />
      ))}
    </div>
  );
}
