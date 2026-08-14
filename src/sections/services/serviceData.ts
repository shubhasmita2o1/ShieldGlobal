import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  Briefcase,
  Building2,
  CheckCircle2,
  Users,
  Cpu,
  Bot,
  Clapperboard,
  Film,
  CalendarDays,
  ClipboardList,
  Award,
} from "lucide-react";

export type ServiceBlock = {
  eyebrow: string;
  heading: string;
  subheading?: string;
  items: string[];
  icon: LucideIcon;
  /** visual treatment of the block */
  variant: "tiles" | "cards" | "dark" | "checks";
};

export type ServiceDetail = {
  slug: string;
  /** label used in the navbar dropdown */
  navLabel: string;
  title: string;
  company: string;
  heroImage: string;
  intro: string;
  blocks: ServiceBlock[];
  commitmentTitle: string;
  commitment: string[];
  tagline?: string;
  seoDescription: string;
  /** External company website — used by the hero CTA button */
  websiteUrl?: string;
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "/services",
    navLabel: "Global Manpower Recruitment",
    title: "Global Manpower Recruitment",
    company: "SHIELD GLOBAL HR SOLUTIONS",
    websiteUrl: "https://www.shieldglobal.in/",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
    intro:
      "Shield Global HR Solutions is a leading international manpower recruitment company, delivering end-to-end workforce solutions to employers across Asia, Africa, Europe and Canada. With a strong sourcing presence in 21 countries, we specialize in identifying, screening, and deploying skilled, semi-skilled, and unskilled manpower tailored to diverse industry needs.",
    blocks: [
      {
        eyebrow: "What we do",
        heading: "Our Recruitment Services",
        subheading: "Technical & Non Technical Hiring",
        icon: Briefcase,
        variant: "cards",
        items: [
          "Bulk Hiring – Blue Collars",
          "Ethical Recruitment",
          "Global Executive Search",
          "Project-Based Recruitment",
        ],
      },
      {
        eyebrow: "Reach",
        heading: "Global Recruitment coverage",
        icon: Globe2,
        variant: "tiles",
        items: [
          "GCC Countries",
          "Canada",
          "European Countries",
          "Singapore",
          "Malaysia",
          "Russia",
        ],
      },
      {
        eyebrow: "Sectors",
        heading: "Industries We Service",
        icon: Building2,
        variant: "dark",
        items: [
          "Oil & Gas & Energy",
          "Construction & Infrastructure",
          "Facility Management",
          "Hospitality",
          "Heavy Engineering",
          "Logistics & Warehousing",
          "Healthcare",
          "IT & Technology",
          "Marine & Shipyard",
        ],
      },
      {
        eyebrow: "Advantages",
        heading: "Why Choose Shield Global HR Solutions",
        icon: CheckCircle2,
        variant: "checks",
        items: [
          "Connecting Jobseekers from 21 countries worldwide",
          "Expertise of Major Government & PPP Project",
          "Drive Interview with team of recruiter according to sector",
          "Strong global talent database from Asia, Africa & Europe",
          "Fast turnaround for Blue bulk recruitment",
          "Compliance-driven international hiring process",
          "End-to-end documentation & mobilization support",
          "Dedicated client relationship management Team",
          "Follow IRIS or Employer guideline in ethical recruitment",
        ],
      },
    ],
    commitmentTitle: "Our Commitment",
    commitment: [
      "At Shield Global HR Solutions, we are committed to connecting global employers with reliable manpower. Our focus is on quality recruitment, timely deployment, and long-term partnerships that support business growth across borders.",
    ],
    tagline:
      "Connecting Talent Across 21 Countries, Delivering Workforce Worldwide.",
    seoDescription:
      "Shield Global HR Solutions delivers end-to-end international manpower recruitment across Asia, Africa, Europe and Canada, with sourcing presence in 21 countries.",
  },
  {
    slug: "/services/staffing-workforce-solutions",
    navLabel: "Staffing & Workforce Solutions",
    title: "Staffing & Workforce Solutions",
    company: "SHIELD WORKFORCE LLP",
    heroImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80",
    intro:
      "We provide end-to-end manpower staffing solutions including recruitment, deployment, payroll management, statutory compliance, and workforce administration. Our services ensure compliant, flexible, and efficient workforce management tailored to business needs.",
    blocks: [
      {
        eyebrow: "What we do",
        heading: "Our Staffing services includes:",
        icon: Users,
        variant: "cards",
        items: [
          "Recruitment & Talent Sourcing",
          "Deployment & Onboarding",
          "Payroll Management",
          "Statutory Compliance Management",
          "Contract Staffing / Third-Party Payroll",
          "Employee Lifecycle Management",
          "Workforce Administration",
          "Skill Training & Development",
        ],
      },
      {
        eyebrow: "Vendorship",
        heading: "What we perform in Vendorship",
        icon: ClipboardList,
        variant: "tiles",
        items: [
          "Ensure timely hiring as per client requirement",
          "Maintain employee records and documentation",
          "Process salaries accurately and on time",
          "Deposit statutory contributions (PF, ESIC, etc.)",
          "Ensure compliance with labour laws",
          "Manage attendance and leave records",
          "Provide replacement for attrition",
          "Coordinate with client HR and operations",
          "Handle employee grievances",
          "Manage exit and final settlement",
        ],
      },
      {
        eyebrow: "Sectors",
        heading: "Industries We Service",
        icon: Building2,
        variant: "dark",
        items: [
          "Oil & Gas & Energy",
          "Manufacturing",
          "Retail & Distribution",
          "Telecom",
          "Banking, Finance, and Insurance",
          "E-Governance",
          "Hospitality",
          "Healthcare",
          "IT & Technology",
          "E-commerce & Logistic",
        ],
      },
      {
        eyebrow: "Advantages",
        heading: "Why Choose Us – Shield Workforce LLP",
        icon: CheckCircle2,
        variant: "checks",
        items: [
          "Backed by 10 Years of Global Recruitment Legacy.",
          "Exclusive Industry Experience & Qualified team",
          "Proven Recruitment Track record of many prestigious projects globally.",
          "Technical Support in planning and estimating workforce requirements and related costs for a project.",
          "An exclusive team of accounting & Tax professionals, monitored by CA/CWA, managing statutory compliances and payroll operations efficiently.",
          "Our Training & Development (T&D) Department provides role-specific training to each employee in line with client requirements prior to onboarding at the site",
        ],
      },
    ],
    commitmentTitle: "Our Commitment",
    commitment: [
      "With a legacy of trust, experienced professionals, and industry-focused expertise, Shield Workforce LLP is committed to delivering dependable staffing solutions that support business growth and workforce efficiency.",
    ],
    seoDescription:
      "Shield Workforce LLP delivers end-to-end staffing solutions: recruitment, deployment, payroll management, statutory compliance and workforce administration.",
  },
  {
    slug: "/services/ai-powered-automation",
    navLabel: "AI Powered Automation",
    title: "AI Powered Automation",
    company: "INFICORP TECHNOLOGY",
    websiteUrl: "https://www.inficorpgroup.com/",
    heroImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80",
    intro:
      "We provide end-to-end manpower staffing solutions including recruitment, deployment, payroll management, statutory compliance, and workforce administration. Our services ensure compliant, flexible, and efficient workforce management tailored to business needs.",
    blocks: [
      {
        eyebrow: "Platforms",
        heading: "Industrial Automation Software",
        icon: Cpu,
        variant: "cards",
        items: [
          "SCADA",
          "PLC",
          "HMI",
          "MES",
          "IIoT Platforms",
          "Predictive Maintenance",
          "Energy Management",
          "Process Automation",
          "ERP Integration Software",
        ],
      },
      {
        eyebrow: "Quality engineering",
        heading: "Automated Software Testing",
        icon: Bot,
        variant: "dark",
        items: [
          "Unit Testing",
          "Integration Testing",
          "Functional Testing",
          "Regression Testing",
          "UI Testing",
          "API Testing",
          "Performance & Load Testing",
          "Security Testing",
          "End-to-End Testing",
        ],
      },
    ],
    commitmentTitle: "Our Commitment",
    commitment: [
      "With a strong legacy of trust, experienced professionals, and industry-focused expertise, InfiCorp Technology is committed to delivering reliable automation solutions that drive business growth, enhance operational efficiency, and enable effective data management.",
    ],
    seoDescription:
      "InfiCorp Technology delivers AI powered industrial automation software — SCADA, PLC, HMI, MES, IIoT — and end-to-end automated software testing services.",
  },
  {
    slug: "/services/media-entertainment",
    navLabel: "Media & Entertainment",
    title: "Media & Entertainment",
    company: "CineGlare Entertainment",
    heroImage:
      "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=2000",
    intro:
      "Cineglare Entertainment, part of Shield Global Group, provides end-to-end media and entertainment solutions including corporate film production, corporate branding, celebrity management, event management, and advertisement video creation. With a creative and professional approach, Cineglare Entertainment supports organizations in enhancing brand presence and delivering impactful visual communication.",
    blocks: [
      {
        eyebrow: "Production",
        heading: "Film Shoot & Video Creation",
        icon: Film,
        variant: "cards",
        items: [
          "Corporate Introduction",
          "Corporate Services video",
          "Product Advertisement video",
          "CSR videos",
          "Government Awareness video",
          "Short Films",
          "Music videos",
          "Cultural & Travel Promotion video",
          "Political promotion video",
          "Sports Live Coverage",
        ],
      },
      {
        eyebrow: "Events",
        heading: "Events we cover",
        icon: CalendarDays,
        variant: "dark",
        items: [
          "Corporate Events",
          "Product Launch Events",
          "Award Ceremonies",
          "Exhibition & Trade Shows",
          "Brand Promotion Events",
          "Celebrity & Entertainment Events",
          "Press Conferences & Media Events",
          "Wedding & Social Events",
          "Cultural Events & Festivals",
          "Training & Workshop Events",
          "Sports & Outdoor Events",
        ],
      },
    ],
    commitmentTitle: "Our Commitment",
    commitment: [
      "At Cineglare Entertainment, we are committed to delivering creative, high-quality, and impactful media solutions that enhance brand presence and audience engagement. We focus on professional execution, innovative storytelling, and timely delivery across corporate films, branding, events, celebrity management, and advertisement video production.",
      "Our goal is to provide end-to-end entertainment and media services that align with client objectives while ensuring excellence, creativity, and reliability in every project.",
    ],
    seoDescription:
      "Cineglare Entertainment provides corporate film production, branding, celebrity management, event management and advertisement video creation.",
  },
];

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "/services": Globe2,
  "/services/staffing-workforce-solutions": Users,
  "/services/ai-powered-automation": Cpu,
  "/services/media-entertainment": Clapperboard,
};

export const AWARD_ICON = Award;

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)!;
}
