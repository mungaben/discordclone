"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import FileUpload from "../file-upload";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "server anme required",
  }),
  imageUrl: z.string().url({
    message: "invalid url",
  }),
});

const InitialModal = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  // loading state

  const isloading = form.formState.isSubmitting;

  // onsubmit

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold ">
            Welcome to Discord
          </DialogTitle>

          <DialogDescription className=" text-center text-zinc-500">
            Your place to talk, video chat, and hang out with friends and
            communities.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
            <div className=" space-y-8 px-6">
              <div className=" felx items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className=" uppercase text-xs font-bold to-zinc-500 dark:text-secondary/70">
                      <FormLabel>Server Image Url</FormLabel>
                      <FormControl>
                        <FileUpload 
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                        
                        
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" uppercase text-xs font-bold to-zinc-500 dark:text-secondary/70">
                    <FormLabel>Server Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isloading}
                        className=" bg-zinc-300/30 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black "
                        {...field}
                      />
                    </FormControl>
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

export default InitialModal;
