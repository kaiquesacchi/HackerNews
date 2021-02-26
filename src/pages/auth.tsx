import React, { useState } from "react";

import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";
import { useRouter } from "next/router";

import * as SC from "../styles/auth.styles";
import Header from "../components/Header";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Auth() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      router.replace("/new/1");
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      router.replace("/new/1");
    },
  });

  return (
    <SC.Container>
      <Header />
      <SC.Title>{formState.login ? "Login" : "Sign Up"}</SC.Title>
      <SC.VerticalArea>
        {!formState.login && (
          <SC.Input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <SC.Input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <SC.Input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </SC.VerticalArea>
      <SC.VerticalArea>
        <SC.Button onClick={() => (formState.login ? login() : signup())}>
          {formState.login ? "login" : "create account"}
        </SC.Button>
        <SC.Button
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }>
          {formState.login ? "need to create an account?" : "already have an account?"}
        </SC.Button>
      </SC.VerticalArea>
    </SC.Container>
  );
}
