import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { ENQUIRY_SUBJECTS } from "./contactData";

type Fields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", phone: "", subject: "", message: "" };

const fieldBase =
  "w-full rounded-lg border border-white/12 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all duration-250 placeholder:text-[#6d7d92] hover:border-white/20 focus:border-[#00bcd4] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#00bcd4]/15";

const fieldError = "border-red-400/70 focus:border-red-400 focus:ring-red-400/20";

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.phone.trim() && !/^[+()\-\s\d]{7,20}$/.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!values.subject) errors.subject = "Please select a subject.";
  if (values.message.trim().length < 10)
    errors.message = "Please tell us a little more (at least 10 characters).";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();

  const update = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setConsentError(consent ? undefined : "Please accept before sending.");
    if (Object.keys(nextErrors).length > 0 || !consent) return;

    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      setValues(EMPTY);
      setConsent(false);
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full"
    >
      <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_12px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-10">
        <h2 className="font-[Cormorant_Garamond,serif] text-3xl font-normal text-white sm:text-[38px]">
          Send us a message
        </h2>
        <p className="mt-1.5 text-[13px] text-[#8a9ab0]">
          We’ll get back to you within 24 hours.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="contact-name"
              label="Your Name"
              required
              error={errors.name}
            >
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                placeholder="John Doe"
                value={values.name}
                onChange={update("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={`${fieldBase} ${errors.name ? fieldError : ""}`}
              />
            </Field>

            <Field
              id="contact-email"
              label="Your E-mail"
              required
              error={errors.email}
            >
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={255}
                placeholder="john@example.com"
                value={values.email}
                onChange={update("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={`${fieldBase} ${errors.email ? fieldError : ""}`}
              />
            </Field>

            <Field id="contact-phone" label="Your Phone" error={errors.phone}>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={20}
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={update("phone")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                className={`${fieldBase} ${errors.phone ? fieldError : ""}`}
              />
            </Field>

            <Field id="contact-subject" label="Subject" required error={errors.subject}>
              <select
                id="contact-subject"
                name="subject"
                value={values.subject}
                onChange={update("subject")}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                className={`${fieldBase} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 ${
                  values.subject ? "text-white" : "text-[#6d7d92]"
                } ${errors.subject ? fieldError : ""}`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a9ab0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                }}
              >
                <option value="" className="bg-[#1a2a3a]">
                  Select an enquiry type
                </option>
                {ENQUIRY_SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-[#1a2a3a]">
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="contact-message" label="Your Message" required error={errors.message}>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              maxLength={1000}
              placeholder="Tell us how we can help you..."
              value={values.message}
              onChange={update("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`${fieldBase} resize-y ${errors.message ? fieldError : ""}`}
            />
          </Field>

          <div>
            <div className="flex items-start gap-3">
              <input
                id="contact-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked) setConsentError(undefined);
                }}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/25 bg-white/10 accent-[#00bcd4]"
              />
              <label
                htmlFor="contact-consent"
                className="cursor-pointer text-xs leading-relaxed text-[#8a9ab0]"
              >
                I accept that Shield Global Group will process my personal data for
                the purpose of handling my request.
              </label>
            </div>
            {consentError && (
              <p className="mt-2 text-xs font-medium text-red-400">{consentError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#00bcd4] to-[#0a8fb8] px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(0,188,212,0.9)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00bcd4]/35 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden />
                  Sending
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
          </button>

          {status === "sent" && (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg border border-[#00bcd4]/40 bg-[#00bcd4]/10 px-4 py-3 text-sm font-medium text-[#7ee8f5]"
            >
              <Check size={16} aria-hidden />
              Thank you! We’ll be in touch soon.
            </motion.p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a9ab0]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#00bcd4]" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}