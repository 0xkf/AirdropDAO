import React from "react";
//https://polygon-mumbai.g.alchemy.com/v2/P2lEQkjFdNjdN0M_mpZKB8r3fAa2M0vT
interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = (props) => {
  return <div className="rounded-xl w-fit">{props.children}</div>;
};
