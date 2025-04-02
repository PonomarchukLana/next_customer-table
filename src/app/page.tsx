import { useServerDarkMode } from "./utils/useServerDarkMode";
import { Table } from "@/components/table";
import { DarkModeToggle } from "@/components/darkModeToggle";

export default async function Home() {
  const theme = await useServerDarkMode();
  return (
    <div>
      <div className="flex justify-end">
        <DarkModeToggle defaultMode={theme} />
      </div>
      <Table />
    </div>
  );
}
