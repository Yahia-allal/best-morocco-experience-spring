import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Layout from "../components/Layout";
import TourCard from "../components/TourCard";
import { toursApi } from "../services/api";

const hero = "/images/home-hero.webp";

const destinations = [
  {
    key: "marrakech",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "sahara",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "atlas",
    image:
      "https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Home() {
  const [tours, setTours] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    toursApi
      .all()
      .then(setTours)
      .catch(() => setTours([]));
  }, []);

  const features = [
    [Compass, "home.features.local"],
    [HeartHandshake, "home.features.tailor"],
    [ShieldCheck, "home.features.support"],
    [Sparkles, "home.features.authentic"],
  ];

  return (
    <Layout>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(8,12,10,.72), rgba(8,12,10,.12)), url(${hero})`,
        }}
      >
        <div className="heroText">
          <span className="kicker">{t("hero.kicker")}</span>

          <h1>
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>

          <p>{t("hero.text")}</p>

          <div className="heroActions">
            <Link className="btn" to="/experiences">
              {t("hero.tours")}
            </Link>

            <Link className="btn outline" to="/booking">
              {t("hero.plan")}
            </Link>
          </div>
        </div>

        <div className="scroll">{t("hero.scroll")}</div>
      </section>

      <section className="intro reveal">
        <div>
          <span className="kicker dark">{t("home.introKicker")}</span>
          <h2>{t("home.introTitle")}</h2>
        </div>

        <p>{t("home.introText")}</p>
      </section>

      <section className="features">
        {features.map(([Icon, key]) => (
          <div className="reveal" key={key}>
            <Icon />
            <b>{t(key)}</b>
            <span>{t("home.features.caption")}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <header className="sectionHead reveal">
          <span className="kicker dark">{t("home.journeysKicker")}</span>
          <h2>{t("home.popular")}</h2>
          <p>{t("home.popularText")}</p>
        </header>

        <div className="grid">
          {tours.slice(0, 6).map((tour) => (
            <TourCard t={tour} key={tour.id} />
          ))}
        </div>
      </section>

      <section className="destinationSection">
        <header className="sectionHead reveal">
          <span className="kicker dark">{t("home.discoverKicker")}</span>
          <h2>{t("home.discoverTitle")}</h2>
          <p>{t("home.discoverText")}</p>
        </header>

        <div className="destinationGrid">
          {destinations.map((destination) => (
            <article className="destinationCard reveal" key={destination.key}>
              <img src={destination.image} alt={t(`home.${destination.key}`)} />

              <div className="destinationOverlay" />

              <div className="destinationContent">
                <h3>{t(`home.${destination.key}`)}</h3>
                <p>{t(`home.${destination.key}Text`)}</p>

                <Link to="/destinations">
                  {t("home.destinationsButton")}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="whySection">
        <div className="whyImage reveal" />

        <div className="whyContent reveal">
          <span className="kicker dark">{t("home.whyKicker")}</span>
          <h2>{t("home.whyTitle")}</h2>
          <p>{t("home.whyText")}</p>

          <Link className="textLink" to="/about">
            {t("nav.about")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="testimonialSection">
        <div className="reveal">
          <span className="kicker">{t("home.testimonialKicker")}</span>
          <h2>{t("home.testimonialTitle")}</h2>
          <p>{t("home.testimonialText")}</p>
        </div>
      </section>

      <section className="statement">
        <div className="reveal">
          <span className="kicker">{t("home.ctaKicker")}</span>
          <h2>{t("home.ctaTitle")}</h2>
          <p>{t("home.ctaText")}</p>

          <Link className="btn light" to="/booking">
            {t("home.ctaButton")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
