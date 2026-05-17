export type LeadPayload = {
  name: string;
  company: string;
  segment: string;
  email: string;
  phone: string;
  service: string;
  language: "RU" | "EN";
  message: string;
  source?: string;
};

export function normalizeLead(input: unknown): LeadPayload {
  const body = (input ?? {}) as Record<string, unknown>;
  const clean = (value: unknown) => String(value ?? "").trim();
  const language = clean(body.language).toUpperCase() === "EN" ? "EN" : "RU";
  return {
    name: clean(body.name),
    company: clean(body.company),
    segment: clean(body.segment),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    service: clean(body.service),
    language,
    message: clean(body.message),
    source: clean(body.source) || "heimdal-group.ru"
  };
}

export function validateLead(lead: LeadPayload): string | null {
  if (!lead.name) return "Укажите имя / Please enter your name";
  if (!lead.company) return "Укажите компанию / Please enter company name";
  if (!lead.phone && !lead.email) return "Укажите телефон или email / Please enter phone or email";
  if (lead.email && !/^\S+@\S+\.\S+$/.test(lead.email)) return "Некорректный email / Invalid email";
  return null;
}

export function telegramText(lead: LeadPayload) {
  return [
    "🛡️ Новая заявка HEIMDALL",
    `Имя: ${lead.name}`,
    `Компания: ${lead.company}`,
    `Сегмент: ${lead.segment || "—"}`,
    `Услуга: ${lead.service || "—"}`,
    `Телефон: ${lead.phone || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Язык: ${lead.language}`,
    `Источник: ${lead.source || "—"}`,
    "",
    `Сообщение: ${lead.message || "—"}`
  ].join("\n");
}
