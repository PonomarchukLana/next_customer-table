import { cookies } from "next/headers";

export const useServerDarkMode = async (defaultTheme = "dark") => {
  const theme = (await cookies()).get("theme")?.value ?? defaultTheme;
  return theme;
};
