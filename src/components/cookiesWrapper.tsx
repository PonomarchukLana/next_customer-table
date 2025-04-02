"use client";

import { CookiesProvider } from "react-cookie";

export const CookiesWrapper = ({ children }: { children: React.ReactNode }) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};
