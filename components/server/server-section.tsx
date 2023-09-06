"use client";

import { TserverWithMembersWithProfiles } from "@/app/types";
import { ChannelType, MemberRole } from "@prisma/client";
import React from "react";
import ActionsToolTip from "../actionsToolTip";
import { Plus, Settings } from "lucide-react";
import { usemodal } from "@/app/hooks/use-modal-stiore";

type ServerSectionProps = {
  label: string;
  role?: MemberRole;
  SectionType: "channel" | "member";
  channelType?: ChannelType;
  server: TserverWithMembersWithProfiles;
};

const ServerSection = ({
  label,
  role,
  SectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { open } = usemodal();
  return (
    <div className=" flex items-center justify-between py-2">
      <p className=" text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && SectionType === "channel" && (
        <ActionsToolTip label="create Channel" side="top">
          <button
            onClick={() => open("createChannel")}
            className=" rounded-full bg-zinc-100 dark:bg-zinc-800 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <Plus className=" h-4 w-4" />
          </button>
        </ActionsToolTip>
      )}
      {role === MemberRole.ADMIN && SectionType === "member" && (
        <ActionsToolTip label=" Mange Members" side="top">
          <button
            onClick={() => open("members",{server})}
            className=" rounded-full bg-zinc-100 dark:bg-zinc-800 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <Settings className=" h-4 w-4" />
          </button>
        </ActionsToolTip>
      )}
    </div>
  );
};

export default ServerSection;
