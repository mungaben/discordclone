// zustand modal store

import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite";

type ModalData = {
  server?: Server;
};

type ModalStore = {
  type: ModalType | null;
  data?: ModalData;
  isOpen: boolean;
  open: (type: ModalType, data?: ModalData) => void;
  Onclose: () => void;
};

// usemodal

export const usemodal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  open: (type, data = {}) => set({ type, isOpen: true, data }),
  Onclose: () => set({ isOpen: false, type: null }),
}));
