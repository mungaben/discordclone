import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import NavigationActions from "./NavigationActions";
import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { ModeToggle } from "../modeToggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSideBar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          ProfileId: profile.id,
        },
      },
    },
  });

  return (
    <div className=" space-y-4 flex flex-col items-center  h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationActions />
      <Separator className=" h-[2px] w-10  bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto" />

      <ScrollArea className=" flex-1 w-full ">
        {servers.map((server) => (
          <div key={server.id} className=" mb-4 ">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
            
          </div>
        ))}
      </ScrollArea>
      <div
       className=" pb-3 mx-auto items-center flex flex-col gap-y-4"
       >
        <ModeToggle/>
        <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements:{
             avatarBox:"h-[48px] w-[48px]"
          }
       
        }}
        />

      </div>
    </div>
  );
};

export default NavigationSideBar;
