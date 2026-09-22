import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Compass, Map, Sparkles } from "lucide-react";

import Layout from "../components/Layout";
import TourCard from "../components/TourCard";
import { toursApi } from "../services/api";

export default function Experiences() {
  const [tours, setTours] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await toursApi.all();
        setTours(data);
      } catch (error) {
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(tours.map((tour) => tour.category).filter(Boolean)),
    ],
    [tours],
  );

  const filteredTours = useMemo(() => {
    if (category === "All") {
      return tours;
    }

    return tours.filter((tour) => tour.category === category);
  }, [tours, category]);

  return (
    <Layout>
      <section className="experiencesHero">
        <div className="experiencesHeroContent">
          <span className="kicker">{t("experiences.kicker")}</span>

          <h1>{t("experiences.title")}</h1>

          <p>{t("experiences.text")}</p>
        </div>
      </section>

      <section className="experiencesIntro reveal">
        <div>
          <span className="kicker dark">{t("experiences.introKicker")}</span>

          <h2>{t("experiences.introTitle")}</h2>
        </div>

        <p>{t("experiences.introText")}</p>
      </section>

      <section className="experienceBenefits">
        <article className="reveal">
          <Compass />
          <h3>{t("experiences.benefits.private")}</h3>
          <p>{t("experiences.benefits.privateText")}</p>
        </article>

        <article className="reveal">
          <Map />
          <h3>{t("experiences.benefits.flexible")}</h3>
          <p>{t("experiences.benefits.flexibleText")}</p>
        </article>

        <article className="reveal">
          <Sparkles />
          <h3>{t("experiences.benefits.authentic")}</h3>
          <p>{t("experiences.benefits.authenticText")}</p>
        </article>
      </section>

      <section className="experiencesTours">
        <header className="sectionHead reveal">
          <span className="kicker dark">
            {t("experiences.collectionKicker")}
          </span>

          <h2>{t("experiences.collectionTitle")}</h2>

          <p>{t("experiences.collectionText")}</p>
        </header>

        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "on" : ""}
              onClick={() => setCategory(item)}
            >
              {item === "All"
                ? t("experiences.all")
                : t(`categories.${item}`, {
                    defaultValue: item,
                  })}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="experiencesStatus">{t("experiences.loading")}</div>
        ) : filteredTours.length > 0 ? (
          <div className="grid">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} t={tour} />
            ))}
          </div>
        ) : (
          <div className="experiencesStatus">{t("experiences.empty")}</div>
        )}
      </section>
    </Layout>
  );
}
