"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  { value: "web", label: "Web Platformu" },
  { value: "mobil", label: "Mobil Uygulama" },
  { value: "crm", label: "CRM" },
  { value: "eticaret", label: "E-Ticaret" },
  { value: "diger", label: "Diğer" },
] as const;

type ServiceType = (typeof SERVICE_OPTIONS)[number]["value"];

interface FormState {
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType | "";
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function ContactForm(): React.ReactElement {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.serviceType) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          serviceType: form.serviceType,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Bir hata oluştu.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", serviceType: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(99,102,241,0.15)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
        >
          Talebiniz alındı
        </h2>
        <p className="text-gray-400">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-gray-500 hover:text-gray-300 transition-colors border-b border-gray-700 hover:border-gray-400 pb-0.5"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ad */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold tracking-[4px] uppercase text-gray-500 mb-2">
          AD SOYAD *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Ahmet Yılmaz"
          className="w-full bg-transparent border-b border-gray-700 focus:border-indigo-500 outline-none text-white placeholder-gray-600 py-3 text-base transition-colors duration-200"
        />
      </div>

      {/* E-posta + Telefon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold tracking-[4px] uppercase text-gray-500 mb-2">
            E-POSTA *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="ahmet@sirket.com"
            className="w-full bg-transparent border-b border-gray-700 focus:border-indigo-500 outline-none text-white placeholder-gray-600 py-3 text-base transition-colors duration-200"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold tracking-[4px] uppercase text-gray-500 mb-2">
            TELEFON
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+90 500 000 00 00"
            className="w-full bg-transparent border-b border-gray-700 focus:border-indigo-500 outline-none text-white placeholder-gray-600 py-3 text-base transition-colors duration-200"
          />
        </div>
      </div>

      {/* Hizmet türü */}
      <div>
        <label className="block text-xs font-semibold tracking-[4px] uppercase text-gray-500 mb-3">
          HİZMET TÜRÜ *
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, serviceType: opt.value }))}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                form.serviceType === opt.value
                  ? {
                      background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                      color: "#ffffff",
                      border: "1px solid transparent",
                    }
                  : {
                      background: "transparent",
                      color: "#9ca3af",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mesaj */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold tracking-[4px] uppercase text-gray-500 mb-2">
          MESAJ *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Projeniz hakkında kısaca bilgi verin..."
          className="w-full bg-transparent border-b border-gray-700 focus:border-indigo-500 outline-none text-white placeholder-gray-600 py-3 text-base transition-colors duration-200 resize-none"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading" || !form.serviceType}
          className="inline-flex items-center gap-3 text-base font-semibold text-white border-b-2 border-indigo-500 pb-1 hover:border-indigo-300 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
        >
          {status === "loading" ? "Gönderiliyor..." : "Talebi Gönder"}
          {status !== "loading" && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
