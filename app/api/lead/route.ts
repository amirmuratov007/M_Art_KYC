import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeLead, telegramText, validateLead } from "@/lib/lead";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LeadInsert = {
  name: string;
  company: string;
  segment: string;
  email: string;
  phone: string;
  service: string;
  language: string;
  message: string;
  source: string;
  telegram_sent: boolean;
  user_agent: string;
};

function envStatus() {
  return {
    supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    tgToken: Boolean(process.env.TG_TOKEN),
    tgChatId: Boolean(process.env.TG_CHAT_ID)
  };
}

async function sendTelegram(text: string) {
  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    console.error("[HEIMDALL_LEAD] Telegram env missing", envStatus());
    return { ok: false, error: "telegram_env_missing" };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("[HEIMDALL_LEAD] Telegram failed", { status: response.status, data });
    return { ok: false, error: data?.description || "telegram_failed" };
  }

  console.log("[HEIMDALL_LEAD] Telegram sent", { message_id: data?.result?.message_id });
  return { ok: true };
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  console.log("[HEIMDALL_LEAD] POST start", { requestId, env: envStatus() });

  try {
    const raw = await request.json().catch(() => null);
    const lead = normalizeLead(raw);
    const validationError = validateLead(lead);

    console.log("[HEIMDALL_LEAD] Payload received", {
      requestId,
      name: lead.name,
      company: lead.company,
      segment: lead.segment,
      service: lead.service,
      hasEmail: Boolean(lead.email),
      hasPhone: Boolean(lead.phone),
      language: lead.language
    });

    if (validationError) {
      console.warn("[HEIMDALL_LEAD] Validation failed", { requestId, validationError });
      return NextResponse.json({ ok: false, message: validationError, requestId }, { status: 400 });
    }

    const telegram = await sendTelegram(telegramText(lead));

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[HEIMDALL_LEAD] Supabase env missing", { requestId, env: envStatus() });
      return NextResponse.json({ ok: false, message: "Server configuration error: Supabase ENV missing", telegram, requestId }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const row: LeadInsert = {
      name: lead.name,
      company: lead.company,
      segment: lead.segment,
      email: lead.email,
      phone: lead.phone,
      service: lead.service,
      language: lead.language,
      message: lead.message,
      source: lead.source || "heimdal-group.ru",
      telegram_sent: telegram.ok,
      user_agent: request.headers.get("user-agent") || "unknown"
    };

    const { data, error } = await supabase.from("leads").insert(row).select("id, created_at").single();
    if (error) {
      console.error("[HEIMDALL_LEAD] Supabase insert failed", { requestId, error });
      return NextResponse.json({ ok: false, message: "Lead received but database insert failed", telegram, supabaseError: error.message, requestId }, { status: 500 });
    }

    console.log("[HEIMDALL_LEAD] Success", { requestId, leadId: data?.id, telegramSent: telegram.ok });
    return NextResponse.json({ ok: true, message: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.", id: data?.id, telegram, requestId });
  } catch (error) {
    console.error("[HEIMDALL_LEAD] Unexpected error", { requestId, error });
    return NextResponse.json({ ok: false, message: "Unexpected server error", requestId }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/lead", method: "POST", env: envStatus() });
}
