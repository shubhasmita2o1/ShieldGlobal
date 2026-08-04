import { useState, type FormEvent } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Send,
  ChevronRight,
} from "lucide-react";
import {
  HQ_ADDRESS_LINES,
  MAP_LINK,
  CONTACT_CHANNELS,
} from "@/sections/contact/contactData";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const services = [
  { label: "HR Solutions", href: "#" },
  { label: "Workforce Management", href: "#" },
  { label: "Corporate Consulting", href: "#" },
  { label: "Talent Acquisition", href: "#" },
  { label: "Payroll Services", href: "#" },
  { label: "Compliance & Advisory", href: "#" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "X (Twitter)", href: "https://twitter.com", Icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
  { label: "WhatsApp", href: "https://wa.me/", Icon: MessageCircle },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
            <div className="sgg-footer-brand">
              <a href="/" aria-label="Shield Global Group home" className="sgg-footer-logo">
                <img src="/logo.png" alt="Shield Global Group" />
              </a>
              <p className="sgg-footer-desc">
                Shield Global Group is a diversified corporate house delivering trusted
                HR, workforce, and consulting services to enterprises worldwide.
              </p>
              <p className="sgg-footer-mission">
                <span>Our Mission:</span> To empower organizations with reliable
                talent solutions and to shape sustainable, people-first growth.
              </p>
              <div className="sgg-footer-socials" aria-label="Social media">
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

            <nav aria-label="Quick links" className="sgg-footer-col">
              <h4 className="sgg-footer-heading">Quick Links</h4>
              <ul>
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="sgg-footer-link">
                      <ChevronRight size={12} aria-hidden="true" />
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Services" className="sgg-footer-col">
              <h4 className="sgg-footer-heading">Our Services</h4>
              <ul>
                {services.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="sgg-footer-link">
                      <ChevronRight size={12} aria-hidden="true" />
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

                        <div className="sgg-footer-col">
              <h4 className="sgg-footer-heading">Get in Touch</h4>
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
                  <span>Mon – Sat: 9:00 AM – 6:00 PM IST</span>
                </li>
                <li>
                  <ExternalLink size={16} aria-hidden="true" />
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="sgg-footer-bottom">
        <div className="sgg-footer-container sgg-footer-bottom-inner">
          <p className="sgg-footer-copy">
            &copy; {new Date().getFullYear()} Shield Global Group. All Rights Reserved.
          </p>
          <ul className="sgg-footer-legal" aria-label="Legal">
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li aria-hidden="true">•</li>
            <li>
              <a href="/terms">Terms &amp; Conditions</a>
            </li>
            <li aria-hidden="true">•</li>
            <li>
              <a href="/cookies">Cookie Policy</a>
            </li>
          </ul>
          <p className="sgg-footer-credit">
            Designed &amp; Developed by <span>Shield Digital Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}