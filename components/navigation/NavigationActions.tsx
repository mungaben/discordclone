"use client";

import { Plus } from "lucide-react";
import React from "react";
import ActionsToolTip from "../actionsToolTip";

const NavigationActions = () => {
  return (
    <div>
      <ActionsToolTip label="add server" side="right" align="center">
        <button className=" group">
          <div className=" flex  mx-3  h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all justify-center items-center dark:bg-neutral-700 group-hover:bg-emerald-500 overflow-clip">
            <Plus className=" group-hover:text-white  transition  text-emerald-500" />
          </div>
        </button>
      </ActionsToolTip>
    </div>
  );
};

export default NavigationActions;
