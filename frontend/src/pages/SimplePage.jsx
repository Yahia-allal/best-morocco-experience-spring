import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";

export default function SimplePage({ type }) {
  const { t } = useTranslation();
  const base = `pages.${type}`;
  return (
    <Layout>
      <div className="pageHero">
        <span className="kicker">{t("pages.brand")}</span>
        <h1>{t(`${base}.hero`)}</h1>
      </div>
      <section className="content reveal">
        <h2>{t(`${base}.title`)}</h2>
        <p>{t(`${base}.text`)}</p>
        {type === "contact" && (
          <a className="btn" href="mailto:info@bestmoroccoexperience.com">
            {t("pages.contact.email")}
          </a>
        )}
      </section>
    </Layout>
  );
}
