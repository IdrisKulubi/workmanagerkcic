import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = (await cookies()).get("session");

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
