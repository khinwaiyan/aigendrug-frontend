import { type ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen p-4 w-full">
      {children}
    </div>
  );
};
