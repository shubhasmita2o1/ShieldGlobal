import { ContactForm, ContactHero, ContactMapCard } from "@/sections/contact";

export function ContactPage() {
  return (
    <>
      <ContactHero />

      <section
        aria-label="Contact details and enquiry form"
        className="relative isolate overflow-hidden bg-[#1a2a3a] py-16 lg:py-20"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(0,188,212,0.10),transparent_55%)]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-stretch gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-12">
          <ContactMapCard />
          <ContactForm />
        </div>
      </section>
    </>
  );
}