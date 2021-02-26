import React from "react";
import { useRouter } from "next/router";

import * as SC from "./styles";

interface iProps {
  page: number;
  lastPage: number;
}

export default function Footer({ page, lastPage }: iProps) {
  const router = useRouter();
  return (
    <SC.Container>
      <SC.Button
        onClick={() => {
          if (page > 1) {
            router.push(`/new/${page - 1}`);
          }
        }}>
        Previous
      </SC.Button>
      <SC.Button
        onClick={() => {
          if (page <= lastPage) {
            router.push(`/new/${page + 1}`);
          }
        }}>
        Next
      </SC.Button>
    </SC.Container>
  );
}
