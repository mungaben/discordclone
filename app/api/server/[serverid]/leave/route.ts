import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { log } from "console";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }
    const serverId = params.serverid;

    console.log("serverId", serverId);
    if (!serverId) {
      return NextResponse.json({ error: "missing serverId" }, { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        ProfileId: {
          not: profile.id,
        },
        members: {
          some: {
            ProfileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            ProfileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json({ server }, { status: 200 });
  } catch (error) {
    console.log("LEAVE SERVER PATCH ERROR", error);
    return NextResponse.json({ "LEAVE SERVER PATCH": error }, { status: 500 });
  }
}
