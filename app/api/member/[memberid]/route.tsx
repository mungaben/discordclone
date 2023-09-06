import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
 
  {params}: { params:{memberid: string}  }
) {
    console.log(params);
    
  try {
    

    const memberid = params.memberid;

    console.log("memberid", memberid);
    
    const { searchParams } = new URL(request.url);
    const { role } = await request.json();
    const serverid = searchParams.get("serverId");

    console.log("serverid", serverid, "memberid", memberid, "role", role);

    const Profile = await currentProfile();
    if (!Profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverid) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    if (!memberid) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverid,
        ProfileId: Profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberid,
              ProfileId: {
                not: Profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            Profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });


    return NextResponse.json(server);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
