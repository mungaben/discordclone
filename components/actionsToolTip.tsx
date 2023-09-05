"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ActionsTolltipProps = {
  children: React.ReactNode;
  label: string;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
};

const ActionsToolTip = ({
  children,
  label,
  side,
  align,
}: ActionsTolltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className=" font-semibold text-sm  capitalize">
            {label?.toLocaleLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionsToolTip;
