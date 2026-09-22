import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CalendarDays,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

import Layout from "../components/Layout";
import { api } from "../services/api";

export default function Booking() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const selectedTour = searchParams.get("tour") || "";
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setSending(true);
    setStatus("");

    try {
      await api("/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setStatus(t("booking.success"));
      form.reset();
    } catch (error) {
      setStatus(t("booking.error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <Layout>
      <section className="bookingHero">
        <div>
          <span className="kicker">{t("booking.kicker")}</span>
          <h1>{t("booking.title")}</h1>
          <p>{t("booking.heroText")}</p>
        </div>
      </section>

      <section className="bookingSection">
        <div className="bookingIntro reveal">
          <span className="kicker dark">{t("booking.formKicker")}</span>

          <h2>{t("booking.formTitle")}</h2>

          <p>{t("booking.formText")}</p>

          <div className="bookingContact">
            <div>
              <Phone size={19} />

              <span>
                <small>{t("booking.phoneLabel")}</small>
                +212 6 21 54 89 65
              </span>
            </div>

            <div>
              <Mail size={19} />

              <span>
                <small>{t("booking.emailLabel")}</small>
                info@bestmoroccoexperience.com
              </span>
            </div>

            <div>
              <MessageCircle size={19} />

              <span>
                <small>{t("booking.supportLabel")}</small>
                {t("booking.support")}
              </span>
            </div>
          </div>
        </div>

        <div className="bookingFormWrapper reveal">
          <form className="bookingForm" onSubmit={submit}>
            {selectedTour && (
              <div className="selectedTour">
                <MapPin size={19} />

                <div>
                  <span>{t("booking.selectedTour")}</span>
                  <strong>{selectedTour}</strong>
                </div>

                <input type="hidden" name="tour" value={selectedTour} />
              </div>
            )}

            <div className="bookingFields">
              <label>
                <span>{t("booking.name")}</span>

                <input
                  required
                  name="name"
                  type="text"
                  placeholder={t("booking.namePlaceholder")}
                />
              </label>

              <label>
                <span>{t("booking.email")}</span>

                <input
                  required
                  name="email"
                  type="email"
                  placeholder="name@email.com"
                />
              </label>

              <label>
                <span>{t("booking.phone")}</span>

                <input name="phone" type="tel" placeholder="+212..." />
              </label>

              <label>
                <span>{t("booking.date")}</span>

                <div className="bookingInputIcon">
                  <CalendarDays size={18} />

                  <input name="travelDate" type="date" />
                </div>
              </label>

              <label>
                <span>{t("booking.travelers")}</span>

                <div className="bookingInputIcon">
                  <Users size={18} />

                  <input
                    name="travelers"
                    type="number"
                    min="1"
                    placeholder="2"
                  />
                </div>
              </label>

              <label>
                <span>{t("booking.destination")}</span>

                <input
                  name="destination"
                  type="text"
                  placeholder={t("booking.destinationPlaceholder")}
                />
              </label>
            </div>

            <label className="bookingMessage">
              <span>{t("booking.messageLabel")}</span>

              <textarea
                name="message"
                rows="7"
                placeholder={t("booking.message")}
              />
            </label>

            <button
              className="btn bookingSubmit"
              type="submit"
              disabled={sending}
            >
              {sending ? t("booking.sending") : t("booking.button")}
            </button>

            {status && (
              <p
                className={
                  status === t("booking.success")
                    ? "bookingStatus success"
                    : "bookingStatus error"
                }
              >
                {status}
              </p>
            )}

            <p className="bookingPrivacy">{t("booking.privacy")}</p>
          </form>
        </div>
      </section>

      <section className="bookingSteps">
        <header className="sectionHead reveal">
          <span className="kicker dark">{t("booking.stepsKicker")}</span>

          <h2>{t("booking.stepsTitle")}</h2>
        </header>

        <div className="bookingStepsGrid">
          <article className="reveal">
            <span>01</span>
            <h3>{t("booking.step1")}</h3>
            <p>{t("booking.step1Text")}</p>
          </article>

          <article className="reveal">
            <span>02</span>
            <h3>{t("booking.step2")}</h3>
            <p>{t("booking.step2Text")}</p>
          </article>

          <article className="reveal">
            <span>03</span>
            <h3>{t("booking.step3")}</h3>
            <p>{t("booking.step3Text")}</p>
          </article>
        </div>
      </section>
    </Layout>
  );
}
