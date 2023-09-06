"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type } from "os";
import React from "react";
import ActionsToolTip from "../actionsToolTip";

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const IconMap = {
  [ChannelType.TEXT]: (
    <Hash className=" flex-shrink-0 w-5 h-5 text-zinc-500  dark:text-zinc-400" />
  ),
  [ChannelType.VIDEO]: (
    <Video className=" flex-shrink-0 w-5 h-5 text-zinc-500  dark:text-zinc-400" />
  ),
  [ChannelType.VOICE]: (
    <Mic className=" flex-shrink-0 w-5 h-5 text-zinc-500  dark:text-zinc-400" />
  ),
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  console.log("PARAMS IN SERVER CHANNEL", params);

  const Icon = IconMap[channel.type];
  return (
    <button
      onClick={() => {}}
      className={cn(
        " group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50  transition ",
        params.channelid === channel.id && " bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {Icon}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition ",
          params.channelid === channel.id &&
            " text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className=" ml-auto flex items-center gap-x-2 ">
          <ActionsToolTip label="Edit">
            <Edit className="hidden group-hover:block h-4 w-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600   dark:hover:text-zinc-300 transition " />
          </ActionsToolTip>
          <ActionsToolTip label="Delete">
            <Trash className="hidden group-hover:block h-4 w-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600   dark:hover:text-zinc-300 transition " />
          </ActionsToolTip>

        </div>
      )}
      {
        channel.name === "general" && (
            <Lock className=" ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400 "/>
        )
      }
    </button>
  );
};

export default ServerChannel;
