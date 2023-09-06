"use client";

import { Search } from "lucide-react";
import { type } from "os";
import React, { use, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useParams, useRouter } from "next/navigation";

type ServerSearchProps = {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          id: string;
          name: string;
          icon: React.ReactNode;
        }[]
      | undefined;
  }[];
};

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setopen] = useState(false);

  const router=useRouter();
  const params=useParams();


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "k" &&(e.metaKey||e.ctrlKey) ) {
            e.preventDefault();
            setopen((prev) => !prev);
        }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener("keydown", handleKeyDown);
        };


  }, []);



//   onclick

const onclick=({id,type}:{id:string,type:"channel"|"member"})=>{
     setopen(false);
    if(type==="channel"){
        router.push(`/servers/${params.serverId}/channels/${id}`)
    }else{
        router.push(`/servers/${params.serverId}/conversations/${id}`)
    }

}
  return (
    <>
      <button
        onClick={() => setopen(true)}
        className="  group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50  transition "
      >
        <Search className=" w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className=" text-zinc-500 dark:text-zinc-400 text-sm font-semibold group-hover:text-zinc-700 dark:group-hover:text-zinc-700 transition ">
          Search
        </p>
        <kbd className=" bg-muted pointer-events-none text-muted-foreground  ml-auto border px-1.5 h-5 rounded text-[10px] select-none items-center  inline-flex gap-1 font-medium font-mono    ">
          <span className=" text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setopen}>
        <CommandInput placeholder="search all channels and members"/>
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            {
                data.map(({label,type,data}) => {
                    if(!data?.length) return null;

                    return(
                        <CommandGroup key={label} heading={label}>
                            {
                                data.map(({id,name,icon}) => {
                                    return(
                                        <CommandItem key={id}  onSelect={()=>onclick({id,type})}>
                                            {icon}
                                            <span>
                                                {name}
                                            </span>

                                        </CommandItem>
                                    )
                                })
                            }
                          
                        </CommandGroup>

                    )
                })
            }
          </CommandList>
    
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
