import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import { setLanguage } from "../i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const language = i18n.language.startsWith("es") ? "es" : "en";

  const links = [
    ["/", t("nav.home")],
    ["/experiences", t("nav.experiences")],
    ["/destinations", t("nav.destinations")],
    ["/about", t("nav.about")],
    ["/contact", t("nav.contact")],
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function changeLanguage(lang) {
    setLanguage(lang);
    setOpen(false);
  }

  return (
    <header className={`header ${open ? "menuOpen" : ""}`}>
      <div className="top">
        <span>
          <Phone />
          +212 6 60 10 99 46
        </span>

        <span>
          <Mail />
          bestmoroccoexperience@gmail.com
        </span>

        <i />
        <a
          href={"https:" + "//wa.me/212660109946"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://www.instagram.com/best_morocco_experience/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram />
        </a>

        <a
          href="https://web.facebook.com/Bestmoroccoexperience"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <Facebook />
        </a>

        <Youtube />
      </div>

      <nav>
        <Link className="logo brandLogo" to="/" onClick={closeMenu}>
          <img src="/images/logo.png" alt="Best Morocco Experience" />
        </Link>

        <div className="navlinks">
          {links.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}

          <div className="languageSwitch" aria-label="Language selector">
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>

            <span>/</span>

            <button
              type="button"
              className={language === "es" ? "active" : ""}
              onClick={() => changeLanguage("es")}
            >
              ES
            </button>
          </div>

          <Link className="btn sm" to="/booking">
            {t("nav.book")}
          </Link>
        </div>

        <button
          type="button"
          className="hamb"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mobile">
          <div className="mobileLinks">
            {links.map(([to, label]) => (
              <Link key={to} to={to} onClick={closeMenu}>
                {label}
              </Link>
            ))}
          </div>

          <div className="mobileBottom">
            <div className="languageSwitch mobileLanguage">
              <button
                type="button"
                className={language === "en" ? "active" : ""}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>

              <span>/</span>

              <button
                type="button"
                className={language === "es" ? "active" : ""}
                onClick={() => changeLanguage("es")}
              >
                ES
              </button>
            </div>

            <Link className="btn mobileBook" to="/booking" onClick={closeMenu}>
              {t("nav.book")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
