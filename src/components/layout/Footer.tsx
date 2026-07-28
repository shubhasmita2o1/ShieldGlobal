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
import logo from "@/assets/logos/shield-global-group-logo.png.asset.json";

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
      {/* Top section */}
      <div className="sgg-footer-top">
        <div className="sgg-footer-container">
          <div className="sgg-footer-grid">
            {/* Company */}
            <div className="sgg-footer-brand">
              <a href="/" aria-label="Shield Global Group home" className="sgg-footer-logo">
                <img src={logo.url} alt="Shield Global Group" />
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

            {/* Quick Links */}
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

            {/* Services */}
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

            {/* Contact + Newsletter */}
            <div className="sgg-footer-col">
              <h4 className="sgg-footer-heading">Get in Touch</h4>
              <ul className="sgg-footer-contact">
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  <span>
                    123 Corporate Avenue, Business District,
                    <br /> Mumbai, Maharashtra 400001, India
                  </span>
                </li>
                <li>
                  <Phone size={16} aria-hidden="true" />
                  <a href="tel:+911234567890">+91 12345 67890</a>
                </li>
                <li>
                  <Mail size={16} aria-hidden="true" />
                  <a href="mailto:info@shieldglobalgroup.com">
                    info@shieldglobalgroup.com
                  </a>
                </li>
                <li>
                  <Clock size={16} aria-hidden="true" />
                  <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                </li>
                <li>
                  <ExternalLink size={16} aria-hidden="true" />
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </li>
              </ul>

              <h4 className="sgg-footer-heading sgg-footer-heading-sm">
                Newsletter
              </h4>
              <form
                className="sgg-footer-newsletter"
                onSubmit={onSubscribe}
                noValidate
              >
                <label htmlFor="sgg-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="sgg-newsletter-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  <Send size={16} aria-hidden="true" />
                  <span>Subscribe</span>
                </button>
              </form>
              {submitted && (
                <p className="sgg-footer-newsletter-ok" role="status">
                  Thanks for subscribing!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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