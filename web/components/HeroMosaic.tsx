"use client";

import Image from "next/image";
import Link from "next/link";
import { useHomeConfig } from "@/lib/home-store";

/**
 * 4-Photo Asymmetric Mosaic
 * Modeled directly on the Mention hero layout:
 * - 4 real photos
 * - 2 staggered asymmetric columns
 * - Clean rounded corners (20px)
 * - Authentic, subtle shadows without artificial AI badges
 */
const isUnoptimized = (src: string) => src.startsWith("data:") || src.startsWith("http");

export function HeroMosaic() {
  const { config } = useHomeConfig();
  const { mosaic } = config;

  const photo1Src = mosaic.photo1 || "/work/hero-agrifarm-app.webp";
  const photo2Src = mosaic.photo2 || "/work/hero-powerfit-gym.webp";
  const photo3Src = mosaic.photo3 || "/work/hero-akiba-erp.webp";
  const photo4Src = mosaic.photo4 || "/work/hero-engineering-team.webp";

  return (
    <div className="mention-mosaic-wrap" aria-label="Akiba Technologies projects and engineering">
      <div className="mention-mosaic-grid">
        {/* Column 1: Left Column (Offset downwards, mirroring Mention layout) */}
        <div className="mention-col col-left">
          {/* Photo 1: Mid-Left (AgriFARM Smart Farming & Hyperlocal Weather App) */}
          <Link
            href="/portfolio"
            className="mention-card card-weather-crop"
            aria-label="View AgriFARM Smart Agriculture Application"
          >
            <div className="mention-img-frame">
              <Image
                src={photo1Src}
                alt={mosaic.photo1Alt || "AgriFARM smart farming mobile application interface"}
                width={900}
                height={1200}
                sizes="(max-width: 768px) 150px, 220px"
                priority
                unoptimized={isUnoptimized(photo1Src)}
                className="mention-photo"
              />
            </div>
          </Link>

          {/* Photo 2: Bottom-Left (PowerFit Gym & Club Management Platform) */}
          <Link
            href="/portfolio"
            className="mention-card card-gym-crop"
            aria-label="View PowerFit Gym Management Platform"
          >
            <div className="mention-img-frame">
              <Image
                src={photo2Src}
                alt={mosaic.photo2Alt || "PowerFit Gym management SaaS platform dashboard"}
                width={1500}
                height={850}
                sizes="(max-width: 768px) 150px, 220px"
                unoptimized={isUnoptimized(photo2Src)}
                className="mention-photo"
              />
            </div>
          </Link>
        </div>

        {/* Column 2: Right Column (Starts at top, larger prominent cards) */}
        <div className="mention-col col-right">
          {/* Photo 3: Top-Right (Akiba ERP Flagship Financial Dashboard) */}
          <Link
            href="/portfolio#akiba-erp"
            className="mention-card card-erp-main"
            aria-label="View Akiba ERP Financial Dashboard"
          >
            <div className="mention-img-frame">
              <Image
                src={photo3Src}
                alt={mosaic.photo3Alt || "Akiba ERP Financial Analytics Dashboard showing revenue growth"}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 380px"
                priority
                unoptimized={isUnoptimized(photo3Src)}
                className="mention-photo"
              />
            </div>
          </Link>

          {/* Photo 4: Bottom-Right (Senior Software Engineers Collaborating in Studio) */}
          <Link
            href="/about"
            className="mention-card card-team-collab"
            aria-label="About Akiba Technologies Engineering Team"
          >
            <div className="mention-img-frame">
              <Image
                src={photo4Src}
                alt={mosaic.photo4Alt || "Senior Akiba Technologies software engineers collaborating over system architecture"}
                width={1400}
                height={788}
                sizes="(max-width: 768px) 100vw, 350px"
                unoptimized={isUnoptimized(photo4Src)}
                className="mention-photo"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
