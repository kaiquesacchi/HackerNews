import React from "react";
import { useHistory } from "react-router-dom";

import { AUTH_TOKEN } from "../constants";

const Header = () => {
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <a href="/" className="ml1 no-underline black">
          Home
        </a>
        <div className="ml1">| </div>
        <a href="/top" className="ml1 no-underline black">
          Top
        </a>
        <div className="ml1">| </div>
        <a href="/search" className="ml1 no-underline black">
          Search
        </a>

        {authToken && (
          <>
            <div className="ml1">| </div>
            <a href="/create" className="ml1 no-underline black">
              Create
            </a>
          </>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push(`/`);
            }}>
            logout
          </div>
        ) : (
          <a href="/login" className="ml1 no-underline black">
            login
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
