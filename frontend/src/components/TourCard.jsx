import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import { localizeTour } from "../i18n/tourLocale";

export default function TourCard({ t: tour }) {
  const { t, i18n } = useTranslation();
  const item = localizeTour(tour, i18n.language);

  return (
    <article className="tour reveal">
      <Link to={`/tour/${item.slug}`}>
        <img src={item.imageUrl} alt={item.title} />
      </Link>
      <div>
        <em>{item.category}</em>
        <h3>{item.title}</h3>
        <p>{item.shortDescription}</p>
        <section>
          <span>
            <Clock /> {item.duration}
          </span>
          <span>
            <MapPin /> {item.destination}
          </span>
        </section>
        <aside>
          <b>{t("tour.from", { price: item.price })}</b>
          <Link to={`/tour/${item.slug}`}>
            {t("tour.explore")} <ArrowUpRight />
          </Link>
        </aside>
      </div>
    </article>
  );
}
