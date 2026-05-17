import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "HEIMDALL website",
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      TG_TOKEN: Boolean(process.env.TG_TOKEN),
      TG_CHAT_ID: Boolean(process.env.TG_CHAT_ID)
    }
  });
}
