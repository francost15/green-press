import { useState } from "react";
import type { FormEvent } from "react";
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone } from "../components/Icons";
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
            className="self-start rounded-lg bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {status === "sending"
              ? t("Enviando...", "Sending...")
              : t("Enviar Mensaje", "Send Message")}
          </button>
          <div aria-live="polite">
            {status === "sent" && (
              <p className="text-sm text-green-600">
                {t("¡Mensaje enviado correctamente!", "Message sent successfully!")}
              </p>
            )}
            {status === "error" && (
              <p id="form-error" className="text-sm text-red-600">
                {t("Error al enviar. Intenta de nuevo.", "Error sending. Please try again.")}
              </p>
            )}
          </div>
        </form>

        <div className="flex flex-col justify-center">
          <p className="mb-10 text-lg leading-relaxed text-text-secondary">
            {t(
              "Busco proyectos donde la IA no sea un buzzword sino la ventaja competitiva. Si tienes un problema complejo y necesitas resultados medibles, hablemos.",
              "I'm looking for projects where AI isn't a buzzword but the competitive edge. If you have a complex problem and need measurable results, let's talk.",
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
