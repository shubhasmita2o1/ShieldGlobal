import { useState, type FormEvent } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Send,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  HQ_ADDRESS_LINES,
  MAP_LINK,
  CONTACT_CHANNELS,
} from "@/sections/contact/contactData";

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const quickLinks = [
    { label: t("footer.links.home"), href: "/" },
    { label: t("footer.links.about"), href: "/about-us" },
    { label: t("footer.links.services"), href: "/services" },
    { label: t("footer.links.testimonials"), href: "/#testimonials" },
    { label: t("footer.links.contact"), href: "/contact" },
    { label: t("footer.links.privacy"), href: "/privacy" },
    { label: t("footer.links.terms"), href: "/terms" },
  ];

  const services = [
    { label: t("footer.services.manpower"), href: "/services" },
    { label: t("footer.services.staffing"), href: "/services/staffing-workforce-solutions" },
    { label: t("footer.services.automation"), href: "/services/ai-powered-automation" },
    { label: t("footer.services.media"), href: "/services/media-entertainment" },
  ];

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <footer className="sgg-footer mt-auto w-full">
      <div className="sgg-footer-top">
        <div className="sgg-footer-container">
          <div className="sgg-footer-grid">
            {/* Brand */}
            <div className="sgg-footer-brand">
              <a
                href="/"
                aria-label={t("footer.homeAria")}
                className="sgg-footer-logo"
              >
                <img src="/logo.png" alt="Shield Global Group" />
              </a>
              <p className="sgg-footer-desc">{t("footer.desc")}</p>
              <p className="sgg-footer-mission">
                <span>{t("footer.missionLabel")}</span> {t("footer.mission")}
              </p>
              <div className="sgg-footer-socials" aria-label={t("footer.socialsAria")}>
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sgg-footer-social"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <nav aria-label={t("footer.quickLinks")} className="sgg-footer-col">
              <h4 className="sgg-footer-heading">{t("footer.quickLinks")}</h4>
              <ul>
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="sgg-footer-link">
                      <ChevronRight size={12} aria-hidden="true" />
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <nav aria-label={t("footer.ourServices")} className="sgg-footer-col">
              <h4 className="sgg-footer-heading">{t("footer.ourServices")}</h4>
              <ul>
                {services.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="sgg-footer-link">
                      <ChevronRight size={12} aria-hidden="true" />
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Get in Touch + Newsletter */}
            <div className="sgg-footer-col">
              <h4 className="sgg-footer-heading">{t("footer.getInTouch")}</h4>
              <ul className="sgg-footer-contact">
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  <span>
                    {HQ_ADDRESS_LINES[0]}
                    <br />
                    {HQ_ADDRESS_LINES[1]}
                  </span>
                </li>
                <li>
                  <Phone size={16} aria-hidden="true" />
                  <a href={CONTACT_CHANNELS[1].href}>
                    {CONTACT_CHANNELS[1].lines[0]}
                  </a>
                </li>
                <li>
                  <Mail size={16} aria-hidden="true" />
                  <a href={CONTACT_CHANNELS[2].href}>
                    {CONTACT_CHANNELS[2].lines[0]}
                  </a>
                </li>
                <li>
                  <Clock size={16} aria-hidden="true" />
                  <span>{t("footer.hours")}</span>
                </li>
                <li>
                  <ExternalLink size={16} aria-hidden="true" />
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("footer.viewMap")}
                  </a>
                </li>
              </ul>

              <h4 className="sgg-footer-heading sgg-footer-heading-sm">
                {t("footer.newsletter")}
              </h4>
              <form
                className="sgg-footer-newsletter"
                onSubmit={onSubscribe}
                noValidate
              >
                <label htmlFor="sgg-newsletter-email" className="sr-only">
                  {t("footer.emailLabel")}
                </label>
                <input
                  id="sgg-newsletter-email"
                  type="email"
                  required
                  placeholder={t("footer.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label={t("footer.subscribeAria")}>
                  <Send size={16} aria-hidden="true" />
                  <span>{t("footer.subscribe")}</span>
                </button>
              </form>
              {submitted && (
                <p className="sgg-footer-newsletter-success" role="status">
                  {t("footer.subscribeSuccess")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sgg-footer-bottom">
        <div className="sgg-footer-container sgg-footer-bottom-inner">
          <p className="sgg-footer-copy">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <ul className="sgg-footer-legal" aria-label={t("footer.legal")}>
            <li>
              <a href="/privacy">{t("footer.links.privacy")}</a>
            </li>
            <li aria-hidden="true">•</li>
            <li>
              <a href="/terms">{t("footer.links.terms")}</a>
            </li>
            <li aria-hidden="true">•</li>
            <li>
              <a href="/cookies">{t("footer.links.cookies")}</a>
            </li>
          </ul>
          <p className="sgg-footer-credit">
            {t("footer.credit")} <span>Shield Digital Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}