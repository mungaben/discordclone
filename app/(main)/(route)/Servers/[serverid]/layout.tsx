import ServerSideBar from "@/components/server/ServerSideBar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Serverslayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverid: string };
}) => {
  // get server with profile id

  console.log("PARAMS IN SERVER LAYOUT", params);
  
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const servers = await db.server.findUnique({
    where: {
      id: params.serverid,
      members: {
        some: {
          ProfileId: profile.id,
        },
      },
    },
  });

  console.log("SERVER IN SERVER LAYOUT", servers);
  
  if (!servers) {
    return redirect("/");
  }
  return (
    <div className=" h-full ">
      <div className=" hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
        <ServerSideBar serverId={servers.id}/>
      </div>
      <main className=" h-full md:pl-60">{children}</main>
    </div>
  );
};

export default Serverslayout;
