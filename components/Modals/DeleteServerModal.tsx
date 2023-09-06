"use client";

import { usemodal } from "@/app/hooks/use-modal-stiore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { on } from "events";
import { redirect, useRouter } from "next/navigation";

const DeleteServerModal = () => {
  const { isOpen, Onclose, type, open, data } = usemodal();

  const isModalOPen = isOpen && type === "deleteServer";
  const [isLOading, setisLOading] = useState(false);

  const { server } = data || {};
const router=useRouter();

  const Onclick=async()=>{
    try {
     
      setisLOading(true);

      const res = await axios.delete(`/api/server/${server?.id}`);

      Onclose();
      router.refresh();

      router.push("/")
      
    } catch (error) {
      console.log(error);
    } finally {
      setisLOading(false);
    }

  }

  return (
    <Dialog open={isModalOPen} onOpenChange={Onclose}>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold ">
             Delete server
          </DialogTitle>
          <DialogDescription className=" text-center text-zinc-500">
            Are you sure you want to delete
            <span className="  font-semibold text-indigo-500  capitalize ml-[1px] ">
              {server?.name} 
            </span>
            ?  will be permanently deleted
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className=" bg-gray-100 px-6 py-4">
          <div className=" flex justify-between items-center w-full">
            <Button
              disabled={isLOading}
              onClick={Onclose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLOading}
              onClick={Onclick}
              variant="primary"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
