"use client";

import { usemodal } from "@/app/hooks/use-modal-stiore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import UseOrigin from "@/app/hooks/use-origin";
import { useState } from "react";
import { set } from "zod";
import axios from "axios";

const InviteModal = () => {
  const { isOpen, Onclose, type, open, data } = usemodal();

  const isModalOPen = isOpen && type === "invite";
  const [copied, setcopied] = useState(false)
  const [isLOading, setisLOading] = useState(false)

  const { server } = data || {};
  const origin = UseOrigin();
  const InviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(InviteUrl);
    setcopied(true)
    setTimeout(() => {
      setcopied(false)
    }   
    , 2000);
  };

  const OnNew=async()=>{
    try {
      setisLOading(true)

      const res=await axios.patch(`/api/server/${server?.id}`)

      open("invite",res.data)
    } catch (error) {
      console.log(error);
      
      
    }finally{
      setisLOading(false)
    }
  }


  return (
    <Dialog open={isModalOPen} onOpenChange={Onclose}>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold ">
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className=" p-6">
          <Label className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Name
          </Label>
          <div className=" flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLOading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={InviteUrl}
            />
            <Button size="icon" onClick={copyToClipboard} disabled={isLOading}>
              {
                copied ? <Check className=" h-4 w-4"/> : <Copy className=" h-4 w-4" />
              }
              
            </Button>
          </div>
          <Button
          disabled={isLOading}
          onClick={OnNew}
            variant="link"
            size={"sm"}
            className=" mt-4 text-zinc-500 text-xs"
          >
            Generate new Link
            <RefreshCcw className=" w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
