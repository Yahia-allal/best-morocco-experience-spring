import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import Layout from "../components/Layout";
import { api } from "../services/api";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setSending(true);
    setStatus("");

    try {
      await api("/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <Layout>
      <section className="contactHero">
        <div>
          <span className="kicker">{t("contact.kicker")}</span>
          <h1>{t("contact.title")}</h1>
          <p>{t("contact.heroText")}</p>
        </div>
      </section>

      <section className="contactSection">
        <div className="contactInfo reveal">
          <span className="kicker dark">{t("contact.infoKicker")}</span>
          <h2>{t("contact.infoTitle")}</h2>
          <p>{t("contact.infoText")}</p>

          <div className="contactDetails">
            <a href="tel:+212621548965">
              <Phone />
              <div>
                <small>{t("contact.phone")}</small>
                <strong>+212 6 21 54 89 65</strong>
              </div>
            </a>

            <a href="mailto:info@bestmoroccoexperience.com">
              <Mail />
              <div>
                <small>{t("contact.email")}</small>
                <strong>info@bestmoroccoexperience.com</strong>
              </div>
            </a>

            <div>
              <MessageCircle />
              <div>
                <small>{t("contact.whatsapp")}</small>
                <strong>+212 6 21 54 89 65</strong>
              </div>
            </div>

            <div>
              <MapPin />
              <div>
                <small>{t("contact.location")}</small>
                <strong>Morocco</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="contactFormBox reveal">
          <h2>{t("contact.formTitle")}</h2>
          <p>{t("contact.formText")}</p>

          <form className="contactForm" onSubmit={submit}>
            <label>
              <span>{t("contact.name")}</span>
              <input
                required
                name="name"
                type="text"
                placeholder={t("contact.namePlaceholder")}
              />
            </label>

            <label>
              <span>{t("contact.email")}</span>
              <input
                required
                name="email"
                type="email"
                placeholder="name@email.com"
              />
            </label>

            <label>
              <span>{t("contact.subject")}</span>
              <input
                name="subject"
                type="text"
                placeholder={t("contact.subjectPlaceholder")}
              />
            </label>

            <label>
              <span>{t("contact.messageLabel")}</span>
              <textarea
                required
                name="message"
                rows="7"
                placeholder={t("contact.message")}
              />
            </label>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? t("contact.sending") : t("contact.button")}
            </button>

            {status === "success" && (
              <p className="contactStatus success">{t("contact.success")}</p>
            )}

            {status === "error" && (
              <p className="contactStatus error">{t("contact.error")}</p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}
