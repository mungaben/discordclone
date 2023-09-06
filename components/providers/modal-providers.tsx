"use client";

import React, { useEffect, useState } from "react";
import CreateServerModal from "../Modals/create-server-modal";
import InitialModal from "../Modals/InitialModal";
import InviteModal from "../Modals/Invite-Modals";
import EditServerModal from "../Modals/edit-server-model";
import MembersModal from "../Modals/Members-Modal";
import CreateChannelModel from "../Modals/create-channel-model";
import LeaveServerModal from "../Modals/leaveservermodal";
import DeleteServerModal from "../Modals/DeleteServerModal";

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
      <EditServerModal/>
      <MembersModal/>
      <CreateChannelModel/>
      <LeaveServerModal/>

      <DeleteServerModal/>
    </div>
  );
};

export default ModalProvider;
