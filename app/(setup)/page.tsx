import { db } from "@/lib/db";
import initialProfile from "@/lib/initial-profile";
import React from "react";

import { redirect } from "next/navigation";
// create schemas for channels/memebes/profile&& server. !user in clerk craete user else rediresct to current user ......check if user is in server any by id redirect  to server

const SetUppage = async () => {
  const profile = await initialProfile();
  // get profle server

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          id: profile.id,
        },
      },
    },
  });

  // if server redirect to serverid
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <div>data</div>;
};

export default SetUppage;
