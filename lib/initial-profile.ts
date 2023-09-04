import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";

const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirectToSignIn();
  }

  // Check if user?.id is defined before using it
  const userId = user?.id;
  if (!userId) {
    throw new Error("User ID is undefined."); // Handle the error appropriately
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: userId, // Use the defined userId
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: userId, // Use the defined userId
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl
    },
  });

  return newProfile;
};

export default initialProfile;
