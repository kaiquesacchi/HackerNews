import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

import * as SC from "../styles/create.styles";
import Header from "../components/Header";
import { VerticalArea } from "../styles/auth.styles";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
export default function Auth() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    onCompleted: () => router.replace("/new/1"),
  });

  return (
    <SC.Container>
      <Header />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}>
        <VerticalArea className="flex flex-column mt3">
          <SC.Input
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <SC.Input
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
          <SC.Button type="submit">Submit</SC.Button>
        </VerticalArea>
      </form>
    </SC.Container>
  );
}
