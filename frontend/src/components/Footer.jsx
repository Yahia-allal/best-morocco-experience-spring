import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <div className="foot">
        <div className="footerBrand">
          <Link className="footerLogo" to="/">
            <b>BME</b>
            <span>
              BEST MOROCCO
              <br />
              EXPERIENCE
            </span>
          </Link>

          <p>{t("footer.text")}</p>

          <div className="footerSocials">
            <a href="#" aria-label="Facebook">
              <Facebook />
            </a>

            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>

            <a href="#" aria-label="YouTube">
              <Youtube />
            </a>
          </div>
        </div>

        <div className="footerColumn">
          <h4>{t("footer.explore")}</h4>

          <Link to="/experiences">{t("nav.experiences")}</Link>

          <Link to="/destinations">{t("nav.destinations")}</Link>

          <Link to="/about">{t("nav.about")}</Link>

          <Link to="/contact">{t("nav.contact")}</Link>
        </div>

        <div className="footerColumn footerContact">
          <h4>{t("footer.contact")}</h4>

          <a href="tel:+212621548965">
            <Phone />
            <span>+212 6 21 54 89 65</span>
          </a>

          <a href="mailto:info@bestmoroccoexperience.com">
            <Mail />
            <span>info@bestmoroccoexperience.com</span>
          </a>

          <Link to="/booking" className="footerJourney">
            {t("nav.book")}
            <ArrowUpRight />
          </Link>
        </div>
      </div>

      <div className="footerBottom">
        <small>© {year} Best Morocco Experience. All rights reserved.</small>

        <span>Morocco</span>
      </div>
    </footer>
  );
}
