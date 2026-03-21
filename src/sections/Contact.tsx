import { useState } from "react";
import type { FormEvent } from "react";
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { Section } from "../components/Section";
import { GlassCard } from "../components/GlassCard";
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
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactLinks = [
    { icon: GithubLogo, label: "GitHub", href: profile.links.github },
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
      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-text-secondary">
                {t("Nombre", "Name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-card-border bg-bg px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent-purple"
                placeholder={t("Tu nombre", "Your name")}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-text-secondary">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border border-card-border bg-bg px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent-purple"
                placeholder={t("tu@email.com", "you@email.com")}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-text-secondary">
                {t("Mensaje", "Message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-card-border bg-bg px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent-purple"
                placeholder={t("Cuéntame sobre tu proyecto...", "Tell me about your project...")}
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-purple px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <PaperPlaneTilt size={18} weight="duotone" />
              {status === "sending" ? t("Enviando...", "Sending...") : t("Enviar Mensaje", "Send Message")}
            </button>
            {status === "sent" && (
              <p className="text-sm text-green-600">{t("¡Mensaje enviado correctamente!", "Message sent successfully!")}</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">{t("Error al enviar. Intenta de nuevo.", "Error sending. Please try again.")}</p>
            )}
          </form>
        </GlassCard>

        <div className="flex flex-col justify-center gap-6">
          <p className="text-lg text-text-secondary">
            {t(
              "Estoy disponible para proyectos freelance, consultoría técnica y oportunidades de colaboración.",
              "I'm available for freelance projects, technical consulting, and collaboration opportunities.",
            )}
          </p>
          <div className="flex flex-col gap-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-3 text-text-secondary transition-colors hover:text-text-primary"
              >
                <link.icon size={22} weight="duotone" className="text-accent-purple" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
