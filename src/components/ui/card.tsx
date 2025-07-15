import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div
    className={`rounded-lg shadow-md bg-white dark:bg-zinc-900 p-4 ${className || ''}`}
    {...props}
  />
);
Card.displayName = "Card"; 