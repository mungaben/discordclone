"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
};

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const filetype = value?.split(".").pop();

  if (value && filetype !== "pdf") {
    return (
      <div className=" relative h-20 w-20 mx-auto">
        <Image fill src={value} alt="image" className="rounded-md" />

        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className=" h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
