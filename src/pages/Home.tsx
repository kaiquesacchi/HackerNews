import React from "react";
import CreateLink from "../components/CreateLink";
import LinkList from "../components/LinkList";

export default function Home() {
  return (
    <div>
      <LinkList />
      <CreateLink />
    </div>
  );
}
