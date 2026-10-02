import { Reveal } from "@/components/Reveal";
import { HeroMosaic } from "@/components/HeroMosaic";
import { DotWavePattern } from "@/components/DotWavePattern";
import { DevelopmentProcess } from "@/components/DevelopmentProcess";
import { RecentWork } from "@/components/RecentWork";
import { WhyChooseKnocker } from "@/components/WhyChooseKnocker";
import { AcademySection } from "@/components/AcademySection";
import { Band } from "@/components/Band";
import { TrustedBy } from "@/components/TrustedBy";
import { ByTheNumbers } from "@/components/ByTheNumbers";
import { TechnologiesWeUse } from "@/components/TechnologiesWeUse";
import { HomeHeroCopy } from "@/components/HomeHeroCopy";

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="hero hero-split-section" aria-label="Hero">
        {/* Seamless 3D Halftone Spherical Dot Wave Pattern (from vector asset) */}
        <div className="dot-wave-container" aria-hidden="true">
          <DotWavePattern opacity={0.05} className="hero-dot-wave" />
        </div>

        {/* Ambient radial spotlight tailored to Akiba logo colors (Emerald #2DCA79 & Deep Navy #002259) */}
        <div className="hero-radial-spotlight" aria-hidden="true" />

        <div className="wrap">
          <div className="hero-split-grid">
            {/* Left Column: Typography, Value Proposition & CTAs */}
            <HomeHeroCopy />

            {/* Right Column: Organic Floating Project Photo Mosaic (Mention-style layout with real project photos) */}
            <div className="hero-visual">
              <Reveal delay={150}>
                <HeroMosaic />
              </Reveal>
            </div>
          </div>
        </div>

        {/* ===================== INTEGRATED HERO BOTTOM DOCK (TRUSTED BY) ===================== */}
        <TrustedBy />
      </section>

      {/* ===================== WHY CHOOSE KNOCKER AI ===================== */}
      <WhyChooseKnocker />

      {/* ===================== SHIPPED REAL WORK SHOWCASE (SHIPPED DEPLOYMENTS) ===================== */}
      <RecentWork />

      {/* ===================== AKIBA BY THE NUMBERS ===================== */}
      <ByTheNumbers />

      {/* ===================== TECHNOLOGIES WE USE FOR CUSTOM SOLUTIONS ===================== */}
      <TechnologiesWeUse />

      {/* ===================== DEVELOPMENT PROCESS ===================== */}
      <DevelopmentProcess />

      {/* ===================== AKIBATECH ACADEMY ===================== */}
      <AcademySection />

      {/* ===================== CALL TO ACTION (PORTFOLIO BAND STYLE) ===================== */}
      <Band
        heading="Let’s build something that saves you time, money and resources."
        ctaHref="/contact"
        ctaLabel="Start a project"
        showSlogan
      />
    </>
  );
}
