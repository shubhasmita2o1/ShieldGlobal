import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import worldTopo from "@/assets/data/world-countries-110m.json";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

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

/** Same pin asset used on shieldglobal.technoriya.com / SGG repo */
const PIN_SRC = "/pin.png";

/** Pin image size in SVG units (matches live site proportion) */
const PIN_W = 22;
const PIN_H = 28;

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
    <Section className="sgg-globe" as="section" aria-labelledby="global-presence-title">
      <Container>
        <header className="sgg-globe-head">
          <span className="sgg-globe-eyebrow">Global Presence</span>
          <h2 id="global-presence-title" className="sgg-globe-title">
            Delivering across <span>{total}+ locations</span> worldwide
          </h2>
          <p className="sgg-globe-lede">
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
            <g className="sgg-globe-countries">
              {countries.map((d: string, i: number) => (
                <path key={i} d={d} />
              ))}
            </g>

            <g className="sgg-globe-markers">
              {points.map((p) => {
                const isActive = active === p.name;
                // Same hierarchy as live site: HQ slightly larger
                const scale =
                  p.kind === "hq" ? 1.25 : p.kind === "regional" ? 1.1 : 1;
                const w = PIN_W * scale;
                const h = PIN_H * scale;

                return (
                  <g
                    key={p.name}
                    className={`sgg-marker sgg-marker-${p.kind}${isActive ? " is-active" : ""}`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.name}${p.country ? ` — ${p.country}` : ""}`}
                    onMouseEnter={() => setActive(p.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(p.name)}
                    onBlur={() => setActive(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/*
                      Same technique as SGG live site:
                      pin.png + tip anchored on coordinate via translate(-50%, -100%)
                      → x centered, y so tip sits on the lat/lng point
                    */}
                    <image
                      href={PIN_SRC}
                      x={p.x - w / 2}
                      y={p.y - h}
                      width={w}
                      height={h}
                      preserveAspectRatio="xMidYMax meet"
                      className="sgg-marker-img"
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

        <ul className="sgg-globe-legend" aria-label="Marker legend">
          <li>
            <span className="sgg-legend-dot sgg-legend-hq" aria-hidden="true" />
            Headquarters
          </li>
          <li>
            <span className="sgg-legend-dot sgg-legend-regional" aria-hidden="true" />
            Regional Office
          </li>
          <li>
            <span className="sgg-legend-dot sgg-legend-office" aria-hidden="true" />
            Office
          </li>
        </ul>

        <div className="sgg-globe-kpis" aria-label="Global presence statistics">
          <div className="sgg-kpi">
            <span className="sgg-kpi-value">{total}</span>
            <span className="sgg-kpi-label">Total Locations</span>
          </div>
          <div className="sgg-kpi">
            <span className="sgg-kpi-value">{REGION_ORDER.length}</span>
            <span className="sgg-kpi-label">Regions</span>
          </div>
          <div className="sgg-kpi">
            <span className="sgg-kpi-value">4</span>
            <span className="sgg-kpi-label">Continents</span>
          </div>
        </div>

        <div className="sgg-globe-regions" aria-label="Locations by region">
          {REGION_ORDER.map((region) => {
            const items = grouped.get(region)!;
            return (
              <article key={region} className="sgg-region-card">
                <header>
                  <h3>{region}</h3>
                  <span>{items.length} locations</span>
                </header>
                <ul>
                  {items.map((loc) => (
                    <li
                      key={loc.name}
                      className={`sgg-region-item sgg-region-item-${loc.kind}${active === loc.name ? " is-active" : ""}`}
                      onMouseEnter={() => setActive(loc.name)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <span className="sgg-region-dot" aria-hidden="true" />
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
