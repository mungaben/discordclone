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
    return redirect(`/Servers/${existingServer.id}`);
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

  if(server){
    return redirect(`/Servers/${server.id}`);
  }
return redirect("/")
};

export default page;
