import { db } from "@/lib/db";
import initialProfile from "@/lib/initial-profile";

import InitialModal from "@/components/Modals/InitialModal";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetUppage = async () => {
 
  // try {
  const profile = await initialProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  console.log(profile.id);
  

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          ProfileId: profile.id,
        },
      },
    },
    include: {
      members: true, // Include the members of each server in the result
    },
  });
  console.log("server is",server);
  

  if (server) {
    // Redirect to the server if found
    console.log("server is",server.id);
    // /Servers/56
 
    
    return redirect(`Servers/${server.id}`);
  }

  return <InitialModal />;
  // } catch (error) {
  //   return (
  //     <div>
  //       <Errorpage />
  //     </div>
  //   );
  // }
};

export default SetUppage;
