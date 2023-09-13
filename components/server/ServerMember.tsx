"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type } from "os";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import UserAvatar from "../user-avatar";

type MemberAndProfile = Member & Profile;

type ServerMemberProps = {
  member: MemberAndProfile;
  server: Server;
};

const RoleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className=" text-indigo-500 ml-2 h-4 w-4 " />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className=" text-rose-500 ml-2 h-4 w-4" />,
};

const ServerMember = ({ server, member }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const roleIcon = RoleIconMap[member.role];
  return <button
  
  
  className={cn("group px-2 mb-1 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50  transition", 
  params.memberid === member.id && " bg-zinc-700/20 dark:bg-zinc-700"
  )}
  >

    <UserAvatar
    
    src={member.imageUrl!}
    className="w-8 h-8"



    />

    <p
    className={cn( "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition ", 
    params.memberid === member.id && " text-primary dark:text-zinc-200 dark:group-hover:text-white"
    )}
    >


      {member.name}
    </p>
    {roleIcon}
  </button>;
};

export default ServerMember;
