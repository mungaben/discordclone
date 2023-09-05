import { db } from "@/lib/db";
import initialProfile from "@/lib/initial-profile";
import React from "react";

import { redirect } from "next/navigation";
import InitialModal from "@/components/Modals/InitialModal";
import Errorpage from "./error";
import { redirectToSignIn } from "@clerk/nextjs";

const SetUppage = async () => {
  // try {
  const profile = await initialProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          ProfileId: profile.id,
        },
      },
    },
    include: {
      members: true, // Include the members of each server in the result
    },
  });

  if (server) {
    // Redirect to the server if found
    console.log(server.id);
    // /Servers/56

    return redirect(`Servers/${server.id}`);
  }

  return <InitialModal />;
  // } catch (error) {
  //   return (
  //     <div>
  //       <Errorpage />
  //     </div>
  //   );
  // }
};

export default SetUppage;
