import { connectDb } from "@/lib/db";
import { getSession } from "@/lib/getSession";
import Settings from "@/models/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    const ownerId = (session as any)?.user?.id;
    if (!ownerId) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    await connectDb();
    const setting = await Settings.findOne({ ownerId });
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json(
      { message: `get setting error ${error}` },
      { status: 400 },
    );
  }
}
