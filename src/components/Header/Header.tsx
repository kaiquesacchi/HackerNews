import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AUTH_TOKEN } from "../../constants";

import * as SC from "./styles";

export default function Header() {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(AUTH_TOKEN) !== null);
  }, [setIsAuthenticated]);

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setIsAuthenticated(false);
    router.replace(`/`);
  };

  return (
    <SC.Container>
      <SC.Links>
        <SC.Title>Hacker News</SC.Title>

        <Link href="/">
          <a className="ml1 no-underline black">Home</a>
        </Link>
        <SC.Divisor>|</SC.Divisor>
        <Link href="/top">
          <a className="ml1 no-underline black">Top</a>
        </Link>
        <SC.Divisor>|</SC.Divisor>
        <Link href="/search">
          <a className="ml1 no-underline black">Search</a>
        </Link>

        {isAuthenticated && (
          <>
            <SC.Divisor>|</SC.Divisor>
            <Link href="/create">
              <a className="ml1 no-underline black">Create</a>
            </Link>
          </>
        )}
      </SC.Links>

      <div className="flex flex-fixed">
        {isAuthenticated ? (
          <div className="ml1 pointer black" onClick={logout}>
            Logout
          </div>
        ) : (
          <Link href="/auth">
            <a className="ml1 no-underline black">Login</a>
          </Link>
        )}
      </div>
    </SC.Container>
  );
}
