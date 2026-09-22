import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, CalendarDays, MapPin, Route, Users } from "lucide-react";

import Layout from "../components/Layout";
import { toursApi } from "../services/api";
import { localizeTour } from "../i18n/tourLocale";

export default function TourDetails() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTour = async () => {
      try {
        const data = await toursApi.one(slug);
        setTour(data);
      } catch (error) {
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [slug]);

  if (loading) {
    return <div className="tourLoading">{t("tour.loading")}</div>;
  }

  if (!tour) {
    return (
      <Layout>
        <section className="tourNotFound">
          <h1>{t("tour.notFound")}</h1>

          <Link className="btn" to="/experiences">
            {t("tour.back")}
          </Link>
        </section>
      </Layout>
    );
  }

  const item = localizeTour(tour, i18n.language);

  const itinerary = item.itinerary
    ? item.itinerary
        .split("|")
        .map((day) => day.trim())
        .filter(Boolean)
    : [];

  return (
    <Layout>
      <section
        className="tourDetailsHero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(8, 13, 10, .76),
              rgba(8, 13, 10, .18)
            ),
            url(${item.imageUrl})
          `,
        }}
      >
        <div className="tourDetailsHeroContent">
          <span className="kicker">
            {t(`categories.${item.category}`, {
              defaultValue: item.category,
            })}
          </span>

          <h1>{item.title}</h1>

          <div className="tourHeroMeta">
            <span>
              <CalendarDays size={18} />
              {item.duration}
            </span>

            <span>
              <MapPin size={18} />
              {item.destination}
            </span>
          </div>

          {item.route && (
            <p className="tourHeroRoute">
              <Route size={19} />
              {item.route}
            </p>
          )}
        </div>
      </section>

      <section className="tourQuickInfo">
        <div>
          <span>{t("tour.duration")}</span>
          <strong>{item.duration}</strong>
        </div>

        <div>
          <span>{t("tour.destination")}</span>
          <strong>{item.destination}</strong>
        </div>

        <div>
          <span>{t("tour.travelStyle")}</span>
          <strong>{t("tour.private")}</strong>
        </div>

        <div>
          <span>{t("tour.priceFrom")}</span>
          <strong>€{item.price}</strong>
        </div>
      </section>

      <section className="tourDetailsLayout">
        <main className="tourDetailsMain">
          <section className="tourOverview reveal">
            <span className="kicker dark">{t("tour.journey")}</span>

            <h2>{t("tour.overview")}</h2>

            <p>{item.description}</p>
          </section>

          {itinerary.length > 0 && (
            <section className="tourItinerary">
              <div className="tourSectionHeading reveal">
                <span className="kicker dark">{t("tour.dayByDay")}</span>

                <h2>{t("tour.itinerary")}</h2>

                <p>{t("tour.itineraryText")}</p>
              </div>

              <div className="itineraryTimeline">
                {itinerary.map((day, index) => (
                  <article className="itineraryDay reveal" key={index}>
                    <div className="itineraryNumber">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <span>
                        {t("tour.day", {
                          number: index + 1,
                        })}
                      </span>

                      <p>{day}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="tourPersonalize reveal">
            <Users size={32} />

            <div>
              <h3>{t("tour.personalizeTitle")}</h3>
              <p>{t("tour.personalizeText")}</p>
            </div>
          </section>
        </main>

        <aside className="tourBookingCard">
          <span className="tourBookingLabel">{t("tour.starting")}</span>

          <div className="tourBookingPrice">
            <strong>€{item.price}</strong>
            <span>{t("tour.perPerson")}</span>
          </div>

          <div className="tourBookingDetails">
            <p>
              <CalendarDays size={18} />
              {item.duration}
            </p>

            <p>
              <MapPin size={18} />
              {item.destination}
            </p>

            <p>
              <Users size={18} />
              {t("tour.private")}
            </p>
          </div>

          <Link
            className="btn tourBookingButton"
            to={`/booking?tour=${encodeURIComponent(item.title)}`}
          >
            {t("tour.request")}
            <ArrowRight size={18} />
          </Link>

          <small>{t("tour.bookingNote")}</small>
        </aside>
      </section>

      <section className="tourBottomCta">
        <div className="reveal">
          <span className="kicker">{t("tour.ctaKicker")}</span>

          <h2>{t("tour.ctaTitle")}</h2>

          <p>{t("tour.ctaText")}</p>

          <Link className="btn light" to="/booking">
            {t("tour.ctaButton")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
