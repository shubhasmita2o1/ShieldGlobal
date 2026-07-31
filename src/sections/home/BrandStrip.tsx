import logoHr from "@/assets/logos/1.png";
import logoWorkforce from "@/assets/logos/2.png";
import logoInficorp from "@/assets/logos/3.png";
import logoCineglare from "@/assets/logos/4.png";

const BRANDS = [
  { src: logoHr, name: "Shield Global HR Solutions", heightClass: "h-[46px]" },
  { src: logoWorkforce, name: "Shield Workforce", heightClass: "h-[46px]" },
  { src: logoInficorp, name: "InfiCorp Technology", heightClass: "h-[38px] -translate-y-1.5" },
  { src: logoCineglare, name: "CineGlare Entertainment", heightClass: "h-[50px]" },
];

export function BrandStrip() {
  return (
    <section className="relative z-10 bg-[#1a2a3a] pb-8 pt-0">
      {/* White logos card — overlaps hero */}
      <div className="relative z-10 mx-6 -mt-8 rounded-2xl bg-white px-3 py-2 shadow-[0_14px_60px_rgba(0,0,0,0.20)] sm:mx-8 sm:-mt-10 sm:px-4 lg:mx-12 lg:-mt-8">
        <ul className="grid grid-cols-2 divide-x divide-y divide-black/10 lg:grid-cols-4 lg:divide-y-0">
          {BRANDS.map((brand) => (
            <li
              key={brand.name}
              className="flex h-[72px] items-center justify-center px-3 sm:h-[80px] sm:px-4 lg:h-[72px] lg:px-5"
            >
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className={`w-auto max-w-[85%] object-contain transition-transform duration-300 hover:scale-105 ${brand.heightClass}`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* About copy under logos (client design) */}
      {/* <div className="mx-4 mt-5 space-y-4 px-2 text-justify text-[clamp(14px,1vw,18px)] leading-[1.8] text-[#c2c8d6] sm:mx-8 lg:mx-12">
        <p>
          <strong className="text-[18px] text-white">Shield Global Group</strong>{" "}
          is a diversified global business group delivering integrated solutions
          across Human Resources, Technology, and Media &amp; Entertainment.
          Backed by a growing network of international associations, strategic
          partners, and a broad global clientele, the group operates through its
          core companies — Shield Global HR Solutions, InfiCorp Technology, and
          Cineglare Entertainment.
        </p>
        <p>
          We provide end-to-end capabilities including global talent solutions,
          AI-powered industrial automation, and creative brand &amp; entertainment
          services. Our collaborative approach, combined with industry expertise
          and global partnerships, enables us to support organizations across
          diverse sectors and geographies. Shield Global Group is committed to
          driving innovation, operational excellence, and sustainable growth in an
          increasingly connected global economy.
        </p>
      </div> */}
    </section>
  );
}