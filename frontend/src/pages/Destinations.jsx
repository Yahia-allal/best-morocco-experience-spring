import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, MapPin } from "lucide-react";
import Layout from "../components/Layout";

const destinations = [
  {
    key: "marrakech",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    key: "sahara",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85",
  },
  {
    key: "atlas",
    image:
      "https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&w=1400&q=85",
  },
  {
    key: "fes",
    image:
      "https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?auto=format&fit=crop&w=1400&q=85",
  },
  {
    key: "chefchaouen",
    image:
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    key: "essaouira",
    image:
      "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Destinations() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="destinationsHero">
        <div>
          <span className="kicker">{t("destinations.kicker")}</span>
          <h1>{t("destinations.title")}</h1>
          <p>{t("destinations.text")}</p>
        </div>
      </section>

      <section className="destinationsIntro reveal">
        <span className="kicker dark">{t("destinations.introKicker")}</span>

        <h2>{t("destinations.introTitle")}</h2>

        <p>{t("destinations.introText")}</p>
      </section>

      <section className="destinationsList">
        {destinations.map((destination, index) => (
          <article
            className={`destinationFeature reveal ${
              index % 2 !== 0 ? "reverse" : ""
            }`}
            key={destination.key}
          >
            <div className="destinationFeatureImage">
              <img
                src={destination.image}
                alt={t(`destinations.places.${destination.key}.name`)}
              />
            </div>

            <div className="destinationFeatureContent">
              <div className="destinationNumber">
                {String(index + 1).padStart(2, "0")}
              </div>

              <span className="destinationLocation">
                <MapPin size={16} />
                {t(`destinations.places.${destination.key}.region`)}
              </span>

              <h2>{t(`destinations.places.${destination.key}.name`)}</h2>

              <p>{t(`destinations.places.${destination.key}.text`)}</p>

              <Link to="/experiences" className="textLink">
                {t("destinations.explore")}
                <ArrowRight size={18} />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="destinationCta">
        <div className="reveal">
          <span className="kicker">{t("destinations.ctaKicker")}</span>
          <h2>{t("destinations.ctaTitle")}</h2>
          <p>{t("destinations.ctaText")}</p>

          <Link className="btn light" to="/booking">
            {t("destinations.ctaButton")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
