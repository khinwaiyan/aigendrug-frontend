"use client";

import React, { createContext, useContext } from "react";
import { useService } from "@/service/useService";

const ServiceContext = createContext<ReturnType<typeof useService> | undefined>(
  undefined
);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const service = useService();

  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};
