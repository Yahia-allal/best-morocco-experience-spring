import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Compass, HeartHandshake, Map, Sparkles } from "lucide-react";

import Layout from "../components/Layout";

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="aboutHero">
        <div>
          <span className="kicker">{t("about.kicker")}</span>
          <h1>{t("about.title")}</h1>
          <p>{t("about.heroText")}</p>
        </div>
      </section>

      <section className="aboutStory">
        <div className="aboutStoryImage reveal" />

        <div className="aboutStoryContent reveal">
          <span className="kicker dark">{t("about.storyKicker")}</span>
          <h2>{t("about.storyTitle")}</h2>
          <p>{t("about.storyText1")}</p>
          <p>{t("about.storyText2")}</p>
        </div>
      </section>

      <section className="aboutValues">
        <header className="sectionHead reveal">
          <span className="kicker dark">{t("about.valuesKicker")}</span>
          <h2>{t("about.valuesTitle")}</h2>
        </header>

        <div className="aboutValuesGrid">
          <article className="reveal">
            <Compass />
            <h3>{t("about.local")}</h3>
            <p>{t("about.localText")}</p>
          </article>

          <article className="reveal">
            <Map />
            <h3>{t("about.flexible")}</h3>
            <p>{t("about.flexibleText")}</p>
          </article>

          <article className="reveal">
            <HeartHandshake />
            <h3>{t("about.personal")}</h3>
            <p>{t("about.personalText")}</p>
          </article>

          <article className="reveal">
            <Sparkles />
            <h3>{t("about.authentic")}</h3>
            <p>{t("about.authenticText")}</p>
          </article>
        </div>
      </section>

      <section className="aboutCta">
        <div className="reveal">
          <span className="kicker">{t("about.ctaKicker")}</span>
          <h2>{t("about.ctaTitle")}</h2>
          <p>{t("about.ctaText")}</p>

          <Link className="btn light" to="/booking">
            {t("about.ctaButton")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
