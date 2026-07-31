import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import worldTopo from "@/assets/data/world-countries-110m.json";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionEyebrow } from "@/sections/about/shared";

type Region =
  | "South Asia"
  | "Southeast Asia"
  | "Middle East"
  | "Africa"
  | "Europe"
  | "North America";

type Kind = "hq" | "regional" | "office";

type Location = {
  name: string;
  country?: string;
  lat: number;
  lng: number;
  region: Region;
  kind: Kind;
};

const LOCATIONS: Location[] = [
  { name: "Mumbai", country: "India", lat: 19.076, lng: 72.877, region: "South Asia", kind: "hq" },
  { name: "Kolkata", country: "India", lat: 22.572, lng: 88.363, region: "South Asia", kind: "office" },
  { name: "Bangalore", country: "India", lat: 12.972, lng: 77.594, region: "South Asia", kind: "office" },
  { name: "Bangladesh", country: "Dhaka", lat: 23.810, lng: 90.412, region: "South Asia", kind: "office" },
  { name: "Nepal", country: "Kathmandu", lat: 27.717, lng: 85.324, region: "South Asia", kind: "office" },
  { name: "Sri Lanka", country: "Colombo", lat: 6.927, lng: 79.861, region: "South Asia", kind: "office" },

  { name: "Singapore", lat: 1.352, lng: 103.820, region: "Southeast Asia", kind: "regional" },
  { name: "Malaysia", country: "Kuala Lumpur", lat: 3.139, lng: 101.687, region: "Southeast Asia", kind: "office" },
  { name: "Indonesia", country: "Jakarta", lat: -6.208, lng: 106.846, region: "Southeast Asia", kind: "office" },
  { name: "Vietnam", country: "Hanoi", lat: 21.028, lng: 105.804, region: "Southeast Asia", kind: "office" },
  { name: "Myanmar", country: "Yangon", lat: 16.866, lng: 96.195, region: "Southeast Asia", kind: "office" },
  { name: "Thailand", country: "Bangkok", lat: 13.756, lng: 100.501, region: "Southeast Asia", kind: "office" },

  { name: "UAE", country: "Dubai", lat: 25.205, lng: 55.271, region: "Middle East", kind: "regional" },
  { name: "Qatar", country: "Doha", lat: 25.286, lng: 51.531, region: "Middle East", kind: "office" },
  { name: "Kuwait", country: "Kuwait City", lat: 29.376, lng: 47.978, region: "Middle East", kind: "office" },
  { name: "Saudi Arabia", country: "Riyadh", lat: 24.713, lng: 46.675, region: "Middle East", kind: "office" },
  { name: "Oman", country: "Muscat", lat: 23.588, lng: 58.408, region: "Middle East", kind: "office" },
  { name: "Bahrain", country: "Manama", lat: 26.228, lng: 50.586, region: "Middle East", kind: "office" },

  { name: "Egypt", country: "Cairo", lat: 30.044, lng: 31.235, region: "Africa", kind: "office" },
  { name: "Tunisia", country: "Tunis", lat: 36.806, lng: 10.181, region: "Africa", kind: "office" },
  { name: "Morocco", country: "Rabat", lat: 34.020, lng: -6.841, region: "Africa", kind: "office" },
  { name: "Sudan", country: "Khartoum", lat: 15.500, lng: 32.559, region: "Africa", kind: "office" },
  { name: "Kenya", country: "Nairobi", lat: -1.292, lng: 36.822, region: "Africa", kind: "office" },
  { name: "Uganda", country: "Kampala", lat: 0.347, lng: 32.583, region: "Africa", kind: "office" },
  { name: "Ghana", country: "Accra", lat: 5.603, lng: -0.187, region: "Africa", kind: "office" },
  { name: "Ethiopia", country: "Addis Ababa", lat: 9.030, lng: 38.740, region: "Africa", kind: "office" },
  { name: "Nigeria", country: "Abuja", lat: 9.076, lng: 7.398, region: "Africa", kind: "office" },
  { name: "South Africa", country: "Johannesburg", lat: -26.204, lng: 28.047, region: "Africa", kind: "office" },

  { name: "Greece", country: "Athens", lat: 37.983, lng: 23.727, region: "Europe", kind: "office" },
  { name: "Turkey", country: "Ankara", lat: 39.933, lng: 32.859, region: "Europe", kind: "office" },
  { name: "United Kingdom", country: "London", lat: 51.507, lng: -0.127, region: "Europe", kind: "regional" },
  { name: "Poland", country: "Warsaw", lat: 52.229, lng: 21.012, region: "Europe", kind: "office" },
  { name: "Russia", country: "Moscow", lat: 55.755, lng: 37.617, region: "Europe", kind: "office" },

  { name: "Canada", country: "Ottawa", lat: 45.421, lng: -75.697, region: "North America", kind: "office" },
];

const REGION_ORDER: Region[] = [
  "South Asia",
  "Southeast Asia",
  "Middle East",
  "Africa",
  "Europe",
  "North America",
];

const MAP_WIDTH = 1400;
const MAP_HEIGHT = 650;

const PIN_PATH =
  "M0 0 C-2.5 -6 -12 -16 -12 -26 A12 12 0 1 1 12 -26 C12 -16 2.5 -6 0 0 Z M0 -26 A5.5 5.5 0 1 0 0 -15 A5.5 5.5 0 1 0 0 -26 Z";

type TopoWorld = typeof worldTopo & {
  objects: { countries: { type: string } };
};

export function GlobalPresence() {
  const [active, setActive] = useState<string | null>(null);

  const { countries, points } = useMemo(() => {
    const topo = worldTopo as unknown as TopoWorld;
    const collection = feature(
      topo as never,
      topo.objects.countries as never,
    ) as unknown as FeatureCollection<Geometry>;

    const projection = geoNaturalEarth1().fitExtent(
      [
        [8, 12],
        [MAP_WIDTH - 8, MAP_HEIGHT - 8],
      ],
      { type: "Sphere" } as never,
    );
    const pathGen = geoPath(projection);

    const countryPaths = collection.features
      .map((f: Feature<Geometry>) => pathGen(f) ?? "")
      .filter(Boolean);

    const pts = LOCATIONS.map((loc) => {
      const p = projection([loc.lng, loc.lat]) ?? [0, 0];
      return { ...loc, x: p[0], y: p[1] };
    });

    return { countries: countryPaths, points: pts };
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<Region, Location[]>();
    for (const r of REGION_ORDER) map.set(r, []);
    for (const l of LOCATIONS) map.get(l.region)!.push(l);
    return map;
  }, []);

  const total = LOCATIONS.length;

  return (
    <Section
      className="sgg-globe"
      as="section"
      aria-labelledby="global-presence-title"
      style={{
        background:
          "radial-gradient(1000px 460px at 50% -15%, rgba(10,143,184,0.16), transparent 60%), #0a1220",
      }}
    >
      <Container>
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <div className="flex justify-center">
            <SectionEyebrow>Global Presence</SectionEyebrow>
          </div>
          <h2
            id="global-presence-title"
            className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            Delivering across{" "}
            <span className="text-white/40">{total}+ locations</span> worldwide
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.85] text-[#c2c8d6]">
            From regional headquarters to on-ground operations, Shield Global Group
            connects talent, technology and enterprise across Asia, the Middle East,
            Africa, Europe and North America.
          </p>
        </header>

        <div className="sgg-globe-map" aria-label="World map showing Shield Global Group locations">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            role="img"
            aria-hidden="true"
            className="sgg-globe-svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="sgg-pin-shadow" x="-50%" y="-20%" width="200%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="1"
                  stdDeviation="0.8"
                  floodColor="#000000"
                  floodOpacity="0.35"
                />
              </filter>
            </defs>

            {/* Country fills only — no border strokes, not interactive */}
            <g className="sgg-globe-countries" pointerEvents="none">
              {countries.map((d: string, i: number) => (
                <path
                  key={i}
                  d={d}
                  fill="#223447"
                  stroke="none"
                  strokeWidth={0}
                />
              ))}
            </g>

            {/* Location markers remain interactive */}
            <g className="sgg-globe-markers">
              {points.map((p) => {
                const isActive = active === p.name;
                const scale =
                  p.kind === "hq" ? 0.55 : p.kind === "regional" ? 0.48 : 0.42;

                return (
                  <g
                    key={p.name}
                    className={`sgg-marker sgg-marker-${p.kind}${isActive ? " is-active" : ""}`}
                    transform={`translate(${p.x} ${p.y}) scale(${scale})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.name}${p.country ? ` — ${p.country}` : ""}`}
                    onMouseEnter={() => setActive(p.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(p.name)}
                    onBlur={() => setActive(null)}
                  >
                    <path
                      d={PIN_PATH}
                      fill="#EA4335"
                      fillRule="evenodd"
                      stroke="#B31412"
                      strokeWidth={0.9}
                      filter="url(#sgg-pin-shadow)"
                      className="sgg-marker-pin"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {points.map((p) => {
            if (active !== p.name) return null;
            const leftPct = (p.x / MAP_WIDTH) * 100;
            const topPct = (p.y / MAP_HEIGHT) * 100;

            return (
              <div
                key={`tt-${p.name}`}
                className="sgg-globe-tooltip"
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              >
                <strong>{p.name}</strong>
                {p.country && <span>{p.country}</span>}
                <em>
                  {p.kind === "hq"
                    ? "Headquarters"
                    : p.kind === "regional"
                      ? "Regional Office"
                      : "Office"}
                </em>
              </div>
            );
          })}
        </div>

        <div
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-14"
          aria-label="Global presence statistics"
        >
          {[
            { value: total, label: "Total Locations" },
            { value: REGION_ORDER.length, label: "Regions" },
            { value: 4, label: "Continents" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-7 py-7 transition-colors duration-300 hover:border-[#0a8fb8]/40 hover:bg-white/[0.06]"
            >
              <p className="font-[Fraunces,serif] text-[36px] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-[40px]">
                {kpi.value}
              </p>
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0a8fb8]">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5"
          aria-label="Locations by region"
        >
          {REGION_ORDER.map((region) => {
            const items = grouped.get(region)!;
            return (
              <article
                key={region}
                className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[#0a8fb8]/35 hover:bg-white/[0.05]"
              >
                <header className="mb-4 flex items-baseline justify-between gap-3 border-b border-[#0a8fb8]/25 pb-3">
                  <h3 className="font-[Fraunces,serif] text-[15px] font-semibold tracking-tight text-white">
                    {region}
                  </h3>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0a8fb8]">
                    {items.length} locations
                  </span>
                </header>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {items.map((loc) => (
                    <li
                      key={loc.name}
                      className={`flex items-center gap-2 text-[13px] leading-snug transition-colors duration-150 ${
                        active === loc.name
                          ? "text-white"
                          : "text-[#b5bccc] hover:text-white"
                      }`}
                      onMouseEnter={() => setActive(loc.name)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a8fb8] shadow-[0_0_6px_rgba(10,143,184,0.55)]"
                        aria-hidden
                      />
                      <span>{loc.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
