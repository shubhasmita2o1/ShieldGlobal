import logoHr from "@/assets/logos/1.png";
import logoWorkforce from "@/assets/logos/2.png";
import logoInficorp from "@/assets/logos/3.png";
import logoCineglare from "@/assets/logos/4.png";

const BRANDS = [
  { src: logoHr, name: "Shield Global HR Solutions", heightClass: "h-[42px]" },
  { src: logoWorkforce, name: "Shield Workforce", heightClass: "h-[42px]" },
  { src: logoInficorp, name: "InfiCorp Technology", heightClass: "h-[34px] -translate-y-1.5" },
  { src: logoCineglare, name: "CineGlare Entertainment", heightClass: "h-[46px]" },
];

export function BrandStrip() {
  return (
    <section className="relative z-30 -mt-10 -mb-10 sm:-mt-12 sm:-mb-12 lg:-mt-14 lg:-mb-14">
      <div
        className="
          relative z-30 mx-auto
          w-[calc(100%-32px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-120px)]
          rounded-[16px] bg-sgg-surface-raised px-2 py-1.5
          shadow-[var(--sgg-e4)]
        "
      >
        <ul className="grid grid-cols-2 divide-x divide-y divide-sgg-border-default lg:grid-cols-4 lg:divide-y-0">
          {BRANDS.map((brand) => (
            <li
              key={brand.name}
              className="flex h-[64px] items-center justify-center px-3 sm:h-[68px] sm:px-4 lg:px-5"
            >
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className={`w-auto max-w-[85%] object-contain object-center transition-transform duration-300 hover:scale-105 ${brand.heightClass}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}