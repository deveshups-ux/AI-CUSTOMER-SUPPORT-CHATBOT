import DashboardClient from "@/components/DashboardClient";
import { getSession } from "@/lib/getSession";
import React from "react";

const page = async () => {
  const session = await getSession();
  return (
    <>
      <DashboardClient ownerId={session?.user?.id!} />
    </>
  );
};

export default page;
