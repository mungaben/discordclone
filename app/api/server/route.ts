import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
        body: {
          error: "Unauthorized",
        },
      });
    }

    const Server = await db.server.create({
      data: {
        name,
        ProfileId: profile.id,
        imageUrl,
        inviteCode: uuidv4(),
        Channel: {
          create: [
            {
              name: "general",
              ProfileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              ProfileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json({
      status: 200,
      body: {
        Server,
      },
      message: "Success",
    });
  } catch (error) {
    console.log("errors server ", error);

    return NextResponse.json({
      status: 500,
      body: {
        error: "Internal Server Error",
      },
    });
  }
}
