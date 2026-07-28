import {
  AboutHero,
  GroupIdentity,
  FoundersMessage,
  EsgSection,
  CorporateGovernance,
} from "@/sections/about";

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <GroupIdentity />
      <FoundersMessage />
      <EsgSection />
      <CorporateGovernance />
    </>
  );
}