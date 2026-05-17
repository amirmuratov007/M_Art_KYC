"use client";

import { useMemo, useState } from "react";

type Lang = "RU" | "EN";
type Status = { type: "idle" | "loading" | "success" | "error"; text: string; requestId?: string };

const copy = {
  RU: {
    title: "Получить консультацию",
    subtitle: "Опишите задачу — мы оценим формат проверки и свяжемся с вами.",
    name: "Имя",
    company: "Компания",
    segment: "Тип клиента",
    service: "Что нужно проверить",
    phone: "Телефон",
    email: "Email",
    message: "Кратко о задаче",
    button: "Отправить заявку",
    loading: "Отправляем...",
    success: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.",
    error: "Не удалось отправить заявку. Проверьте данные или попробуйте позже."
  },
  EN: {
    title: "Request consultation",
    subtitle: "Describe your case — we will assess the screening format and contact you.",
    name: "Name",
    company: "Company",
    segment: "Client type",
    service: "Screening scope",
    phone: "Phone",
    email: "Email",
    message: "Brief context",
    button: "Send request",
    loading: "Sending...",
    success: "Request sent. We will contact you shortly.",
    error: "Could not send request. Please check the details or try again later."
  }
};

export default function LeadForm() {
  const [lang, setLang] = useState<Lang>("RU");
  const [status, setStatus] = useState<Status>({ type: "idle", text: "" });
  const [form, setForm] = useState({
    name: "",
    company: "",
    segment: "Business / Enterprise",
    email: "",
    phone: "",
    service: "Counterparty due diligence",
    message: ""
  });

  const t = copy[lang];
  const isLoading = status.type === "loading";
  const canSubmit = useMemo(() => form.name.trim() && form.company.trim() && (form.email.trim() || form.phone.trim()), [form]);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status.type !== "idle" && status.type !== "loading") setStatus({ type: "idle", text: "" });
  }

  async function submitLead(event?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    event?.stopPropagation();

    console.log("[HEIMDALL_FORM] submit clicked", { canSubmit, form });

    if (!canSubmit) {
      const text = lang === "RU" ? "Заполните имя, компанию и телефон или email." : "Please fill name, company, and phone or email.";
      setStatus({ type: "error", text });
      return;
    }

    setStatus({ type: "loading", text: t.loading });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ ...form, language: lang, source: typeof window !== "undefined" ? window.location.href : "heimdal-group.ru" })
      });

      const data = await response.json().catch(() => ({}));
      console.log("[HEIMDALL_FORM] api response", { status: response.status, data });

      if (!response.ok || !data?.ok) {
        setStatus({ type: "error", text: data?.message || t.error, requestId: data?.requestId });
        return;
      }

      setStatus({ type: "success", text: data?.message || t.success, requestId: data?.requestId });
      setForm({ name: "", company: "", segment: "Business / Enterprise", email: "", phone: "", service: "Counterparty due diligence", message: "" });
    } catch (error) {
      console.error("[HEIMDALL_FORM] submit failed", error);
      setStatus({ type: "error", text: t.error });
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20">
      <div className="glass overflow-hidden rounded-[34px] p-6 md:p-10">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-cyanice">Secure intake</p>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{t.subtitle}</p>
          </div>
          <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
            {(["RU", "EN"] as Lang[]).map((item) => (
              <button key={item} type="button" onClick={() => setLang(item)} className={`rounded-full px-4 py-2 text-sm font-bold ${lang === item ? "bg-white text-slate-950" : "text-slate-300"}`}>{item}</button>
            ))}
          </div>
        </div>

        <form onSubmit={submitLead} className="grid gap-4 md:grid-cols-2" noValidate>
          <input className="input" placeholder={t.name} value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" />
          <input className="input" placeholder={t.company} value={form.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" />
          <select className="input" value={form.segment} onChange={(e) => update("segment", e.target.value)}>
            <option>Business / Enterprise</option>
            <option>Recruitment agency</option>
            <option>Security / Compliance</option>
            <option>Private client</option>
          </select>
          <select className="input" value={form.service} onChange={(e) => update("service", e.target.value)}>
            <option>Counterparty due diligence</option>
            <option>Client KYC / risk screening</option>
            <option>Employee / candidate background check</option>
            <option>Recruitment agency candidate audit</option>
            <option>Custom OSINT investigation</option>
          </select>
          <input className="input" placeholder={t.phone} value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" />
          <input className="input" placeholder={t.email} value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
          <textarea className="input min-h-36 md:col-span-2" placeholder={t.message} value={form.message} onChange={(e) => update("message", e.target.value)} />
          <div className="md:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button type="button" onClick={submitLead} disabled={isLoading} className="btn-primary px-8 py-4 text-base">
              {isLoading ? t.loading : t.button}
            </button>
            <div aria-live="polite" className={`min-h-6 text-sm ${status.type === "success" ? "text-emerald-300" : status.type === "error" ? "text-red-300" : "text-slate-400"}`}>
              {status.text}{status.requestId ? <span className="block text-xs text-slate-500">Request ID: {status.requestId}</span> : null}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
