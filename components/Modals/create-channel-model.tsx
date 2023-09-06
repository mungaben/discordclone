"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";

import qs from "query-string";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import FileUpload from "../file-upload";
import { usemodal } from "@/app/hooks/use-modal-stiore";
import { ChannelType } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Channel Name required",
    })
    .refine((name) => name !== "general", {
      message: "name can't be 'general' ",
    }),
  type: z.nativeEnum(ChannelType),
});

const CreateChannelModel = () => {
  const { isOpen, Onclose, type } = usemodal();

  const isModalOPen = isOpen && type === "createChannel";

  console.log("create server modal", isModalOPen);

  const router = useRouter();
  const params = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  // loading state
 
  const isloading = form.formState.isSubmitting;

  // onsubmit

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data ", data);
     // http://localhost:3000/Servers/c7a63dee-7d3b-4a30-9a06-444643c527b1

     console.log("Params",params)
    try {
      //  strigfy url with qs

      const url = qs.stringifyUrl({
        url: "/api/channel",
        query: {
          serverId: params.serverid,
        },
      });

      await axios.post(url, data);
      form.reset();
      router.refresh();
      Onclose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseModal = () => {
    form.reset();
    Onclose();
  };

  return (
    <Dialog open={isModalOPen} onOpenChange={handleCloseModal}>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold ">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
            <div className=" space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="  text-xs font-bold to-zinc-500 dark:text-secondary/70">
                    <FormLabel className="uppercase  ">Channel name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" Enter channel name"
                        disabled={isloading}
                        className=" bg-zinc-300/30 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Channel Type</FormLabel>
                    <Select
                      disabled={isloading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" bg-zinc-300/30 border-0 outline-none capitalize focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black ">
                          <SelectValue placeholder="select Channel Type">
                            {field.value}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=" w-full">
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className=" capitalize "
                          >
                            {type.toLocaleLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="  bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isloading}>
                create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModel;
