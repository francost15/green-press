import { useState } from "react";
import type { FormEvent } from "react";
import { LinkedinLogo, EnvelopeSimple, Phone } from "../components/Icons";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { profile } from "../data/profile";

export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
        // Clear the success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactLinks = [
    { icon: LinkedinLogo, label: "LinkedIn", href: profile.links.linkedin },
    { icon: EnvelopeSimple, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
  ];

  return (
    <Section
      id="contacto"
      title={t("Contacto", "Contact")}
      subtitle={t("¿Tienes un proyecto en mente? Hablemos", "Have a project in mind? Let's talk")}
    >
      <div className="grid gap-16 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm text-text-secondary">
              {t("Nombre", "Name")}
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              aria-required="true"
              aria-describedby={status === "error" ? "form-error" : undefined}
              className="w-full border-b border-border bg-transparent pb-3 text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
              placeholder={t("Tu nombre", "Your name")}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm text-text-secondary">
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              aria-required="true"
              aria-describedby={status === "error" ? "form-error" : undefined}
              className="w-full border-b border-border bg-transparent pb-3 text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
              placeholder={t("tu@email.com", "you@email.com")}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm text-text-secondary">
              {t("Mensaje", "Message")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              aria-describedby={status === "error" ? "form-error" : undefined}
              rows={4}
              className="w-full resize-none border-b border-border bg-transparent pb-3 text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
              placeholder={t("Cuéntame sobre tu proyecto...", "Tell me about your project...")}
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary btn-primary-pulse self-start disabled:animate-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending"
              ? t("Enviando...", "Sending...")
              : t("Enviar Mensaje", "Send Message")}
          </button>
        </form>

        {/* Floating Toast Notification */}
        <div
          className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
            status === "sent" || status === "error"
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0 pointer-events-none"
          }`}
          aria-live="polite"
        >
          {status === "sent" && (
            <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-6 py-4 text-green-500 shadow-lg backdrop-blur-md">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium">
                {t(
                  "¡Mensaje enviado! Te responderé lo más pronto posible.",
                  "Message sent! I'll get back to you as soon as possible.",
                )}
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-500 shadow-lg backdrop-blur-md">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p className="text-sm font-medium">
                {t("Error al enviar. Intenta de nuevo.", "Error sending. Please try again.")}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-10 text-lg leading-relaxed text-text-secondary">
            {t(
              "¿Listo para pasar de la experimentación a la producción? Ayudo a empresas a desplegar soluciones de IA que realmente mueven la aguja. Cuéntame tu desafío y tracemos el camino técnico para resolverlo.",
              "Ready to move from experimentation to production? I help companies deploy AI solutions that actually move the needle. Tell me about your challenge, and let's map out the technical path to solve it.",
            )}
          </p>
          <div className="flex flex-col gap-5">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
              >
                <link.icon size={20} weight="bold" className="text-text-tertiary" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
