import { useMemo, useState } from "react";
import worldMap from "@/assets/images/worldmap.jpg.asset.json";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

type Location = {
  name: string;
  lat: number;
  lng: number;
  region: "South Asia" | "Southeast Asia" | "Middle East" | "Africa" | "Europe" | "Americas";
  hub?: boolean;
};

const LOCATIONS: Location[] = [
  { name: "Mumbai", lat: 19.07, lng: 72.87, region: "South Asia", hub: true },
  { name: "Kolkata", lat: 22.57, lng: 88.36, region: "South Asia", hub: true },
  { name: "Bangalore", lat: 12.97, lng: 77.59, region: "South Asia", hub: true },
  { name: "Bangladesh", lat: 23.81, lng: 90.41, region: "South Asia" },
  { name: "Nepal", lat: 27.71, lng: 85.32, region: "South Asia" },
  { name: "Sri Lanka", lat: 6.93, lng: 79.86, region: "South Asia" },
  { name: "Singapore", lat: 1.35, lng: 103.82, region: "Southeast Asia", hub: true },
  { name: "Malaysia", lat: 3.14, lng: 101.69, region: "Southeast Asia" },
  { name: "Indonesia", lat: -6.21, lng: 106.85, region: "Southeast Asia" },
  { name: "Vietnam", lat: 21.03, lng: 105.85, region: "Southeast Asia" },
  { name: "Myanmar", lat: 16.87, lng: 96.2, region: "Southeast Asia" },
  { name: "Thailand", lat: 13.76, lng: 100.5, region: "Southeast Asia" },
  { name: "UAE", lat: 25.2, lng: 55.27, region: "Middle East", hub: true },
  { name: "Qatar", lat: 25.29, lng: 51.53, region: "Middle East" },
  { name: "Kuwait", lat: 29.38, lng: 47.99, region: "Middle East" },
  { name: "KSA", lat: 24.71, lng: 46.68, region: "Middle East" },
  { name: "Oman", lat: 23.59, lng: 58.41, region: "Middle East" },
  { name: "Bahrain", lat: 26.23, lng: 50.59, region: "Middle East" },
  { name: "Egypt", lat: 30.04, lng: 31.24, region: "Africa" },
  { name: "Tunisia", lat: 36.81, lng: 10.18, region: "Africa" },
  { name: "Morocco", lat: 34.02, lng: -6.83, region: "Africa" },
  { name: "Sudan", lat: 15.5, lng: 32.56, region: "Africa" },
  { name: "Kenya", lat: -1.29, lng: 36.82, region: "Africa" },
  { name: "Uganda", lat: 0.35, lng: 32.58, region: "Africa" },
  { name: "Ghana", lat: 5.6, lng: -0.19, region: "Africa" },
  { name: "Ethiopia", lat: 9.03, lng: 38.74, region: "Africa" },
  { name: "Nigeria", lat: 9.08, lng: 7.4, region: "Africa" },
  { name: "South Africa", lat: -26.2, lng: 28.05, region: "Africa" },
  { name: "Greece", lat: 37.98, lng: 23.73, region: "Europe" },
  { name: "Turkey", lat: 39.93, lng: 32.86, region: "Europe" },
  { name: "UK", lat: 51.51, lng: -0.13, region: "Europe", hub: true },
  { name: "Poland", lat: 52.23, lng: 21.01, region: "Europe" },
  { name: "Russia", lat: 55.75, lng: 37.62, region: "Europe" },
  { name: "Canada", lat: 45.42, lng: -75.7, region: "Americas" },
];

const REGION_ORDER: Location["region"][] = [
  "South Asia",
  "Southeast Asia",
  "Middle East",
  "Africa",
  "Europe",
  "Americas",
];

function project(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

export function GlobalPresence() {
  const [active, setActive] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<Location["region"], Location[]>();
    for (const r of REGION_ORDER) map.set(r, []);
    for (const l of LOCATIONS) map.get(l.region)!.push(l);
    return map;
  }, []);

  return (
    <Section className="sgg-globe" as="section" aria-labelledby="global-presence-title">
      <Container>
        <header className="sgg-globe-head">
          <span className="sgg-globe-eyebrow">Global Presence</span>
          <h2 id="global-presence-title" className="sgg-globe-title">
            Delivering across <span>34+ locations</span> worldwide
          </h2>
          <p className="sgg-globe-lede">
            From regional headquarters to on-ground operations, Shield Global Group
            connects talent, technology and enterprise across Asia, the Middle East,
            Africa, Europe and the Americas.
          </p>
        </header>

        <div className="sgg-globe-grid">
          <div className="sgg-globe-map" role="img" aria-label="World map showing Shield Global Group locations">
            <img
              src={worldMap.url}
              alt=""
              width={1920}
              height={960}
              loading="lazy"
              className="sgg-globe-map-img"
            />
            <div className="sgg-globe-pins">
              {LOCATIONS.map((loc) => {
                const { x, y } = project(loc.lat, loc.lng);
                const isActive = active === loc.name;
                return (
                  <button
                    key={loc.name}
                    type="button"
                    className={`sgg-pin${loc.hub ? " sgg-pin-hub" : ""}${isActive ? " sgg-pin-active" : ""}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onMouseEnter={() => setActive(loc.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(loc.name)}
                    onBlur={() => setActive(null)}
                    aria-label={loc.name}
                  >
                    <span className="sgg-pin-dot" aria-hidden="true" />
                    <span className="sgg-pin-label">{loc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="sgg-globe-side" aria-label="Locations by region">
            <div className="sgg-globe-stats">
              <div>
                <strong>34+</strong>
                <span>Locations</span>
              </div>
              <div>
                <strong>6</strong>
                <span>Regions</span>
              </div>
              <div>
                <strong>5</strong>
                <span>Continents</span>
              </div>
            </div>
            <div className="sgg-globe-regions">
              {REGION_ORDER.map((region) => (
                <div key={region} className="sgg-globe-region">
                  <h3>{region}</h3>
                  <ul>
                    {grouped.get(region)!.map((loc) => (
                      <li
                        key={loc.name}
                        className={`${loc.hub ? "is-hub " : ""}${active === loc.name ? "is-active" : ""}`}
                        onMouseEnter={() => setActive(loc.name)}
                        onMouseLeave={() => setActive(null)}
                      >
                        <span className="sgg-globe-region-dot" aria-hidden="true" />
                        {loc.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}