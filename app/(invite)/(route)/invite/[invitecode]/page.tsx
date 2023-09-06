import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type InvitePageCodeProps = {
  params: {
    invitecode: string;
  };
};

const page = async ({ params }: InvitePageCodeProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  if (!params?.invitecode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.invitecode,
      members: {
        some: {
          ProfileId: profile.id,
        },
      },
    },
  });

 
  

  if (existingServer) {
    console.log("EXISTING SERVER IN PAGE INVITE MEMBER", existingServer);
    return redirect(`/Servers/${existingServer.id}`);
  }
  const existingServerwithsameInvitecode = await db.server.findFirst({
    where: {
      inviteCode: params.invitecode,
    },
  });
  
  if (!existingServerwithsameInvitecode) {
    console.log(" NO EXISTING SERVER IN PAGE WITH SUCH INVITE CODE", existingServerwithsameInvitecode);
    
    // Handle the case where the server does not exist
    return redirect("/"); // Redirect to an appropriate page
  }

  

  // update serve by creating a new member
  const server = await db.server.update({
    where: {
      inviteCode: params.invitecode,
    },
    data: {
      members: {
        create: [
          {
            ProfileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/Servers/${server.id}`);
  }
  return redirect("/");
};

export default page;
