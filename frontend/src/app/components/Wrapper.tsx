import { type ReactNode } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen p-4 w-full">{children}</div>;
};
