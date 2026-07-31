import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/sections/about/shared";

export function HomeAbout() {
  return (
    <section
      aria-labelledby="home-about-heading"
      className="relative bg-[#1a2a3a] pb-16 pt-2 sm:pb-20 sm:pt-4"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl"
        >
          <motion.h2 id="home-about-heading" className="sr-only">
            About Shield Global Group
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="space-y-5 text-[clamp(14px,1.05vw,17px)] leading-[1.85] text-[#c2c8d6]"
          >
            <p>
              <strong className="font-semibold text-white">
                Shield Global Group
              </strong>{" "}
              is a diversified global business group delivering integrated
              solutions across Human Resources, Technology, and Media &amp;
              Entertainment. Backed by a growing network of international
              associations, strategic partners, and a broad global clientele,
              the group operates through its core companies — Shield Global HR
              Solutions, InfiCorp Technology, and Cineglare Entertainment.
            </p>
            <p>
              We provide end-to-end capabilities including global talent
              solutions, AI-powered industrial automation, and creative brand
              &amp; entertainment services. Our collaborative approach,
              combined with industry expertise and global partnerships, enables
              us to support organizations across diverse sectors and
              geographies. Shield Global Group is committed to driving
              innovation, operational excellence, and sustainable growth in an
              increasingly connected global economy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}