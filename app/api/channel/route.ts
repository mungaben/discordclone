import { Profile } from "@prisma/client";
import { create } from "zustand";
import { MemberRole, Server } from "@prisma/client";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }

    const { name, type } = await req.json();

    if (!name || !type) {
      return NextResponse.json(
        { error: "missing name or type" },
        { status: 400 }
      );
    }

    if (name === "general") {
      return NextResponse.json(
        { error: "invalid channel name" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return NextResponse.json({ error: "missing serverId" }, { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            ProfileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        Channel: {
          create: {
            ProfileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json({ server }, { status: 200 });
  } catch (error) {
    console.log("CREATE CHANNEL ERROR", error);

    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
