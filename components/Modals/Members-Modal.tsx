"use client";

import { usemodal } from "@/app/hooks/use-modal-stiore";
import { TserverWithMembersWithProfiles } from "@/app/types";
import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const RoleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className=" h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldCheck className=" h-4 w-4  text-rose-500" />,
};

const MembersModal = () => {
  const { isOpen, Onclose, type, open, data } = usemodal();
  const [isloading, setisloading] = useState("");
  const router = useRouter();

  const isModalOPen = isOpen && type === "members";

  const { server } = (data as { server: TserverWithMembersWithProfiles }) || {};

  const OnRoleChange = async (role: MemberRole, memberId: string) => {
    try {
      setisloading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/member/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });
      const resposnse = await axios.patch(url, { role });
      router.refresh();

      open("members", { server: resposnse.data });
    } catch (error) {
      console.log(error);
    } finally {
      setisloading("");
    }
  };

  const Onkick = async (memberId: string) => {
    try {
      setisloading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/member/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });
      const resposnse = await axios.delete(url);
      router.refresh();

      open("members", { server: resposnse.data });
    } catch (error) {
      console.log(error);
    } finally {
      setisloading("");
    }
  };

  return (
    <Dialog open={isModalOPen} onOpenChange={Onclose}>
      <DialogContent className=" bg-white text-black  overflow-hidden">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold ">
            Manage Members
          </DialogTitle>
          <DialogDescription className="  text-center text-zinc-500 ">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="  mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className=" flex items-center gap-x-2 mb-6 ">
              <UserAvatar src={member.Profile.imageUrl!} />
              <div className=" flex flex-col gap-y-1">
                <div className=" text-xs font-semibold items-center flex gap-x-[4px]">
                  {member.Profile.name}
                  {RoleIconMap[member.role]}
                </div>
                <p className=" text-xs text-zinc-500">{member.Profile.email}</p>
              </div>
              {server?.ProfileId !== member.ProfileId &&
                isloading !== member.id && (
                  <div className=" ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className=" h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className=" w-4 h-4 mr-2" />
                            <span> Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => OnRoleChange("GUEST", member.id)}
                              >
                                <Shield className=" h-2 w-2 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className=" h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  OnRoleChange("MODERATOR", member.id)
                                }
                              >
                                <ShieldCheck className=" h-2 w-2 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className=" h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => Onkick(member.id)}>
                          <Gavel className=" h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {isloading === member.id && (
                <Loader2 className=" animate-spin ml-auto w-4 h-4 text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
