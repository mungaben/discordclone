import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./ServerHeader";

type serverSideBarProps = {
  serverId?: string;
};

const ServerSideBar = async ({ serverId }: serverSideBarProps) => {
  // get profile

  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      Channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          Profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannel = server?.Channel.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const videoChannel = server?.Channel.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const audioChannel = server?.Channel.filter(
    (channel) => channel.type === ChannelType.VOICE
  );

  const members = server?.members.filter(
    (member) => member.Profile.id !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server?.members.find(
    (member) => member.Profile.id === profile.id
  )?.role;

  return (
    <div className=" flex flex-col text-primary  h-full w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSideBar;
