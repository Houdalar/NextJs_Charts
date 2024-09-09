import DashboardLyout from "@/components/Dashboard/DashboardLyout";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Next.js Dashboard ",
  description: "This is Next.js Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <DashboardLyout />
      </DefaultLayout>
    </>
  );
}
