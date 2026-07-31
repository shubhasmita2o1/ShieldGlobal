import { motion } from "framer-motion";
import { fadeUp, stagger, SectionEyebrow } from "@/sections/about/shared";

type Partner = {
  name: string;
  sector: string;
};

/** Placeholder partner set — replace with verified partner brands when supplied. */
const PARTNERS: Partner[] = [
  { name: "Gulf Infrastructure", sector: "Infrastructure" },
  { name: "Meridian Manufacturing", sector: "Industrial" },
  { name: "Vantera Energy", sector: "Energy" },
  { name: "Northbridge Consumer", sector: "Consumer brands" },
  { name: "Altura Hospitality", sector: "Hospitality" },
  { name: "Sable Logistics", sector: "Logistics" },
  { name: "Helion Systems", sector: "Technology" },
  { name: "Orient Marine", sector: "Maritime" },
];

const ROW_ONE = PARTNERS.slice(0, 4);
const ROW_TWO = PARTNERS.slice(4);

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="mx-3 flex h-full min-h-[112px] w-[248px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-900/[0.08] bg-white px-6 py-6 text-center shadow-[0_1px_2px_rgba(15,26,40,0.04)] transition-all duration-300 hover:border-[#0a8fb8]/40 hover:shadow-[0_18px_40px_rgba(15,26,40,0.10)] sm:w-[280px]">
      <span className="font-[Fraunces,serif] text-[17px] font-semibold leading-tight tracking-tight text-neutral-600 transition-colors duration-300 hover:text-neutral-900 sm:text-[18px]">
        {partner.name}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
        {partner.sector}
      </span>
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
  const loop = [...items, ...items, ...items, ...items];
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
      className="relative overflow-hidden bg-[#f6f7f9] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_-20%,rgba(10,143,184,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <SectionEyebrow>Partners &amp; Clients</SectionEyebrow>
            <h2
              id="partners-title"
              className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.75rem]"
            >
              Working alongside{" "}
              <span className="text-neutral-400">established organisations</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-neutral-600">
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
        <MarqueeRow items={ROW_ONE} duration="38s" />
        <MarqueeRow items={ROW_TWO} duration="46s" reverse />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0a8fb8]"
        >
          Global reach &nbsp;·&nbsp; Long-term partnerships
        </motion.p>
      </div>
    </section>
  );
}
