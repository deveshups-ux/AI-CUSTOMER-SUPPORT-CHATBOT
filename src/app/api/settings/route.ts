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

    const { businessName, supportEmail, knowledge } = await req.json();
    await connectDb();

    const settings = await Settings.findOneAndUpdate(
      { ownerId },
      { ownerId, businessName, supportEmail, knowledge },
      { new: true, upsert: true },
    );
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: `settings error ${error}` },
      { status: 400 },
    );
  }
}
