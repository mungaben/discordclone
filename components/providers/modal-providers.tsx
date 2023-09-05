"use client";

import React, { useEffect, useState } from "react";
import CreateServerModal from "../Modals/create-server-modal";
import InitialModal from "../Modals/InitialModal";
import InviteModal from "../Modals/Invite-Modals";

const ModalProvider = () => {
  const [isopen, setisOpen] = useState(false);

  useEffect(() => {
    setisOpen(true);
  }, []);

  if (!isopen) {
    return null;
  }

  return (
    <div>
      <CreateServerModal />
      <InviteModal/>
    </div>
  );
};

export default ModalProvider;
