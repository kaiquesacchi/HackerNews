import React from "react";

interface iProps {
  link: {
    description: string;
    url: string;
  };
}

export default function Link({ link }: iProps) {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
}
