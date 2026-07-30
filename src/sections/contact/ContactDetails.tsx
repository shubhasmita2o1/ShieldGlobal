import { Mail, MapPin, Phone, Clock, type LucideIcon } from "lucide-react";

export type ContactChannel = {
  icon: LucideIcon;
  label: string;
  lines: string[];
  href?: string;
  hint?: string;
};

export const HQ_ADDRESS_LINES = [
  "104, Hinal Residency, Dahanukarwadi Junction,",
  "Kandivali West, Mumbai – 400 067, India",
];

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.714791605458!2d72.83471497583994!3d19.207655547824988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7bbaf9d9cd5%3A0x2ced5051619c2559!2sSHIELD%20GLOBAL!5e0!3m2!1sen!2sin!4v1778222460615!5m2!1sen!2sin";

export const MAP_LINK = "https://maps.google.com/?q=SHIELD+GLOBAL+Kandivali+West+Mumbai";

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: MapPin,
    label: "Headquarters",
    lines: HQ_ADDRESS_LINES,
    href: MAP_LINK,
    hint: "View on Google Maps",
  },
  {
    icon: Phone,
    label: "Telephone",
    lines: ["+22 28678678"],
    href: "tel:+2228678678",
    hint: "Mon – Sat, business hours",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["info@shieldglobalindia.com"],
    href: "mailto:info@shieldglobalindia.com",
    hint: "Response within 24 hours",
  },
  {
    icon: Clock,
    label: "Working Hours",
    lines: ["Monday – Saturday", "9:00 AM – 6:00 PM IST"],
  },
];

export const ENQUIRY_SUBJECTS = [
  "Overseas Recruitment",
  "Staffing & Workforce Solutions",
  "AI-Powered Industrial Automation",
  "Media & Entertainment",
  "Partnership / Corporate",
  "Other",
];