import { motion } from "framer-motion";
import { fadeUp, stagger, SectionEyebrow } from "@/sections/about/shared";
import partner1 from "@/assets/partners/I1.png";
import partner2 from "@/assets/partners/I2.png";
import partner3 from "@/assets/partners/I3.png";
import partner4 from "@/assets/partners/I4.png";
import partner5 from "@/assets/partners/I5.png";
import partner6 from "@/assets/partners/I6.png";
import partner7 from "@/assets/partners/I7.png";
import partner8 from "@/assets/partners/I8.png";
import partner9 from "@/assets/partners/I9.png";
import partner10 from "@/assets/partners/I10.png";
import partner11 from "@/assets/partners/I11.png";
import partner12 from "@/assets/partners/I12.png";
import partner13 from "@/assets/partners/I13.png";
import partner14 from "@/assets/partners/I14.png";
import partner15 from "@/assets/partners/I15.png";
import partner16 from "@/assets/partners/I16.png";
import partner17 from "@/assets/partners/I17.png";
import partner18 from "@/assets/partners/I18.png";
import partner19 from "@/assets/partners/I19.png";
import partner20 from "@/assets/partners/I20.png";
import partner21 from "@/assets/partners/I21.png";
import partner22 from "@/assets/partners/I22.png";
import partner23 from "@/assets/partners/I23.png";
import partner24 from "@/assets/partners/I24.png";
import partner25 from "@/assets/partners/I25.png";
import partner26 from "@/assets/partners/I26.png";
import partner27 from "@/assets/partners/I27.png";
import partner28 from "@/assets/partners/I28.png";
import partner29 from "@/assets/partners/I29.png";
import partner30 from "@/assets/partners/I30.png";
import partner31 from "@/assets/partners/I31.png";
import partner32 from "@/assets/partners/I32.png";
import partner33 from "@/assets/partners/I33.png";
import partner34 from "@/assets/partners/I34.png";
import partner35 from "@/assets/partners/I35.png";
import partner36 from "@/assets/partners/I36.png";
import partner37 from "@/assets/partners/I37.png";
import partner38 from "@/assets/partners/I38.png";
import partner39 from "@/assets/partners/I39.png";
import partner40 from "@/assets/partners/I40.png";
import partner41 from "@/assets/partners/I41.png";
import partner42 from "@/assets/partners/I42.png";
import partner43 from "@/assets/partners/I43.png";
import partner44 from "@/assets/partners/I44.png";
import partner45 from "@/assets/partners/I45.png";

type Partner = {
  name: string;
  logo: string;
};

const PARTNERS: Partner[] = [
  { name: "fmm", logo: partner1 },
  { name: "Al Asmakh Facilities Management", logo: partner2 },
  { name: "Como", logo: partner3 },
  { name: "Waseef", logo: partner4 },
  { name: "Al Asmakh A to Z Services", logo: partner5 },
  { name: "Mosanada Facilities Management", logo: partner6 },
  { name: "Drydocks World, A DP World Company", logo: partner7 },
  { name: "Doha Petroleum Construction Co. (DOPET)", logo: partner8 },
  { name: "Retaj Hotels & Hospitality", logo: partner9 },
  { name: "Abyar", logo: partner10 },
  { name: "Jaddarah Workforce Services", logo: partner11 },
  { name: "Flora", logo: partner12 },
  { name: "Teixeira Duarte", logo: partner13 },
  { name: "Intercity FM", logo: partner14 },
  { name: "Carmel Group", logo: partner15 },
  { name: "Amwaj", logo: partner16 },
  { name: "Como Facilities Management Services", logo: partner17 },
  { name: "Al Andalus", logo: partner18 },
  { name: "Shaqab", logo: partner19 },
  { name: "Fox Delivery", logo: partner20 },
  { name: "Dicotech", logo: partner21 },
  { name: "Tawreed Middle East", logo: partner22 },
  { name: "Canpower General Trading", logo: partner23 },
  { name: "Accor", logo: partner24 },
  { name: "Al Mana Group", logo: partner25 },
  { name: "Ibin Ajayan", logo: partner26 },
  { name: "Inteco Management Co.", logo: partner27 },
  { name: "Desert Line Group", logo: partner28 },
  { name: "Naaas Holding Group", logo: partner29 },
  { name: "Nakilat", logo: partner30 },
  { name: "WTE, EVN Group", logo: partner31 },
  { name: "Cayan", logo: partner32 },
  { name: "Sunway", logo: partner33 },
  { name: "Morex Group", logo: partner34 },
  { name: "Hassan Lari Group", logo: partner35 },
  { name: "InfiCorp", logo: partner36 },
  { name: "Qatar Fabrication Company (QFAB)", logo: partner37 },
  { name: "Refso Smart Maintenance", logo: partner38 },
  { name: "Gazprom", logo: partner39 },
  { name: "Rosneft", logo: partner40 },
  { name: "Black Sea Oil & Gas", logo: partner41 },
  { name: "United Construction Est.", logo: partner42 },
  { name: "Sheraton", logo: partner43 },
  { name: "Profit Holding", logo: partner44 },
  { name: "Seaworks", logo: partner45 },
];

const ROW_ONE = PARTNERS.filter((_, i) => i % 2 === 0);
const ROW_TWO = PARTNERS.filter((_, i) => i % 2 === 1);

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="mx-3 flex h-[110px] w-[220px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-sgg-border-default bg-[#000714] shadow-[var(--sgg-e1)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sgg-border-accent hover:shadow-[var(--sgg-e3)] sm:h-[124px] sm:w-[248px]">
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: Partner[];
  duration: string;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="sgg-marquee-track sgg-marquee-mask overflow-hidden py-2">
      <div
        className={`sgg-marquee ${reverse ? "sgg-marquee-reverse" : ""}`}
        style={{ ["--sgg-marquee-duration" as string]: duration }}
      >
        {loop.map((partner, i) => (
          <PartnerCard key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section
      aria-labelledby="partners-title"
      className="relative overflow-hidden bg-sgg-surface-tinted py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_-20%,rgba(47,211,232,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <SectionEyebrow>Partners & Clients</SectionEyebrow>
            <h2
              id="partners-title"
              className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-sgg-ink-primary sm:text-4xl lg:text-[2.75rem]"
            >
              Working alongside{" "}
              <span className="text-sgg-ink-tertiary">established organisations</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-sgg-ink-secondary">
              A selection of the enterprises, operators and institutions the
              group collaborates with across its markets.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mt-12 space-y-3 lg:mt-16"
      >
        <MarqueeRow items={ROW_ONE} duration="52s" />
        <MarqueeRow items={ROW_TWO} duration="60s" reverse />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 text-[12px] font-semibold uppercase tracking-[0.18em] text-sgg-ink-accent"
        >
          Global reach &nbsp;·&nbsp; Long-term partnerships
        </motion.p>
      </div>
    </section>
  );
}