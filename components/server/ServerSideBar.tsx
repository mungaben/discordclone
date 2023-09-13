import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./ServerHeader";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./ServerMember";

const IconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
  [ChannelType.VOICE]: <Mic className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className=" text-indigo-500 mr-2 h-4 w-4" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className=" text-rose-500 mr-2 h-4 w-4" />,
};

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
      <ScrollArea className=" flex-1 px-3">
        <div className=" mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.Profile.id,
                  name: member.Profile.name!,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className=" bg-zinc-200 dark:bg-zinc-700 rounded-md my-2 " />
        {!!textChannel?.length && (
          <div className=" mt-2">
            <ServerSection
              label="Text Channels"
              role={role}
              SectionType="channel"
              server={server}
              channelType="TEXT"
            />
            <div className=" space-y-[2px]">
              {textChannel.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannel?.length && (
          <div className=" mt-2">
            <ServerSection
              label="Audio Channels"
              role={role}
              SectionType="channel"
              server={server}
              channelType="VOICE"
            />
            <div className=" space-y-[2px]"></div>
            {audioChannel.map((audio) => (
              <ServerChannel
                key={audio.id}
                channel={audio}
                server={server}
                role={role}
              />
            ))}
          </div>
        )}
        {!!videoChannel?.length && (
          <div className=" mt-2">
            <ServerSection
              label="Video Channels"
              role={role}
              SectionType="channel"
              server={server}
              channelType="VIDEO"
            />
            {videoChannel.map((video) => (
              <ServerChannel
                key={video.id}
                channel={video}
                server={server}
                role={role}
              />
            ))}
          </div>
        )}
        {!!members?.length && (
          <div className=" mt-2">
            <ServerSection
              label="Members"
              role={role}
              SectionType="member"
              server={server}
            /> 
            {members.map((member) => (
              <ServerMember key={member.id}
              member={member}
              server={server}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
