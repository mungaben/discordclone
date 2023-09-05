// zustand modal store


import {create} from "zustand";

export type ModalType = "createServer";

type ModalStore = {
  type: ModalType| null;
  isOpen: boolean;
  open: (type: ModalType) => void;
  Onclose: () => void;
};



// usemodal

export const usemodal= create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    open: (type) => set({ type, isOpen: true }),
    Onclose: () => set({ isOpen: false, type: null }),
    }));


