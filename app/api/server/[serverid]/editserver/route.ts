import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { v4 as uuid } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const { name, imageUrl } = body;
    if (!profile) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }

    if (!params.serverid) {
      return NextResponse.json(
        { message: "Server not found" },
        { status: 404 }
      );
    }

    const server = await db.server.update({
      where: {
        id: params.serverid,
        ProfileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(
      { server },
      { status: 200 }
    );
  } catch (error) {
    console.log("server edit", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
