"use client";

import { TserverWithMembersWithProfiles } from "@/app/types";
import { MemberRole, Server } from "@prisma/client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { usemodal } from "@/app/hooks/use-modal-stiore";
type ServerHeaderProps = {
  server: TserverWithMembersWithProfiles;
  role?: MemberRole;
};

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const { open } = usemodal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" focus:outline-none" asChild>
        <button className=" w-full text-md font-semibold px-3 flex items-center h-12  border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className=" h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={() => open("invite", { server })}
        className=" w-56  text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] "
      >
        {isModerator && (
          <DropdownMenuItem className=" text-indigo-600 dark:text-indigo-400 px-3 cursor-pointer text-sm py-2 ">
            Invite People
            <UserPlus className=" h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem className="  px-3 cursor-pointer text-sm py-2 ">
            server settings
            <Settings className=" h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="  px-3 cursor-pointer text-sm py-2 ">
            Invite People
            <Users className=" h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className=" px-3 cursor-pointer text-sm py-2 ">
            Create Channel
            <PlusCircle className=" h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className=" text-rose-500 px-3 cursor-pointer text-sm py-2 ">
            Delete Server
            <Trash className=" h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className=" text-indigo-600 dark:text-indigo-400 px-3 cursor-pointer text-sm py-2 ">
            Leave server
            <LogOut className=" h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
