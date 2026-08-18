"use client";

import { useState, type FormEvent } from "react";

import { CTA_BUTTON_CLASSES } from "@/components/ui/ctaButtonClasses";
import { ChevronDownIcon } from "@/components/ui/icons";
import { SERVICES } from "@/config/services";

const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/ayarchitectsdesign@gmail.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  // Two independent honeypots, on purpose — FormSubmit's own convention
  // (_honey) plus our own decoy field name, so a bot has to correctly
  // ignore both, not just the one it might recognize.
  _honey: string;
  website: string;
}

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
  _honey: "",
  website: "",
};

const fieldClasses =
  "w-full rounded-sm border border-accent-secondary/30 bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/40 transition-[border-color,box-shadow] duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";
const labelClasses =
  "font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70";

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>(
    {}
  );

  function updateField<K extends keyof FormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypots filled in => almost certainly a bot. Reject silently: no
    // request fires, no error or success state changes, nothing that
    // teaches an automated filler what a "correct" submission looks like.
    if (values._honey.trim() || values.website.trim()) {
      return;
    }

    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          projectType: values.projectType || "Not specified",
          message: values.message.trim(),
          _subject: `New enquiry from ${values.name.trim()} — ${
            values.projectType || "General Enquiry"
          }`,
          _honey: values._honey,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setValues(EMPTY_FORM);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-accent-secondary/20 bg-surface p-8 sm:p-10">
        <p
          role="status"
          aria-live="polite"
          className="font-sans text-base text-foreground"
        >
          Thanks — we&rsquo;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex flex-col gap-6 rounded-sm border border-accent-secondary/20 bg-surface p-6 sm:p-10"
    >
      {/* Honeypots — visually hidden off-screen (not display:none, which
       * some bots specifically detect and skip), never focusable, never
       * announced. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      >
        <label>
          Leave this empty
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            value={values._honey}
            onChange={(e) => updateField("_honey", e.target.value)}
          />
        </label>
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={`mt-2 ${fieldClasses}`}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1 font-sans text-xs font-medium text-foreground">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`mt-2 ${fieldClasses}`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 font-sans text-xs font-medium text-foreground">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={`mt-2 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="contact-project-type" className={labelClasses}>
            Project Type
          </label>
          <div className="relative mt-2">
            <select
              id="contact-project-type"
              name="projectType"
              value={values.projectType}
              onChange={(e) => updateField("projectType", e.target.value)}
              className={`appearance-none pr-10 ${fieldClasses}`}
            >
              <option value="">Select one (optional)</option>
              {SERVICES.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={`mt-2 resize-none ${fieldClasses}`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 font-sans text-xs font-medium text-foreground">
            {errors.message}
          </p>
        )}
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="font-sans text-sm font-medium text-foreground">
            Something went wrong sending your message. Please try again, or
            reach out directly via email or WhatsApp above.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`mt-2 w-fit disabled:cursor-not-allowed disabled:opacity-60 ${CTA_BUTTON_CLASSES}`}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
