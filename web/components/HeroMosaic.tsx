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
const isUnoptimized = (src: string) =>
  src.startsWith("data:") || src.startsWith("http") || src.endsWith(".svg");

export function HeroMosaic() {
  const { config } = useHomeConfig();
  const { mosaic } = config;

  const photo1Src = mosaic.photo1 || "/work/hero-card-royal-candy.svg";
  const photo2Src = mosaic.photo2 || "/work/hero-card-amigos-gym.svg";
  const photo3Src = mosaic.photo3 || "/work/hero-card-akiba-erp.svg";
  const photo4Src = mosaic.photo4 || "/work/hero-card-tway-realestate.svg";

  const photo1Fit = mosaic.photo1Fit || mosaic.imageFit || "contain";
  const photo2Fit = mosaic.photo2Fit || mosaic.imageFit || "contain";
  const photo3Fit = mosaic.photo3Fit || mosaic.imageFit || "contain";
  const photo4Fit = mosaic.photo4Fit || mosaic.imageFit || "contain";

  return (
    <div className="mention-mosaic-wrap" aria-label="Akiba Technologies verified client project deployments">
      <div className="mention-mosaic-grid">
        {/* Column 1: Left Column (Offset downwards, mirroring Mention layout) */}
        <div className="mention-col col-left">
          {/* Photo 1: Mid-Left (Royal Candy & Chocolate Luxury Digital Catalog) */}
          <Link
            href="/portfolio#royal-candy"
            className="mention-card card-weather-crop"
            aria-label="View Royal Candy & Chocolate Platform"
          >
            <div className="mention-img-frame">
              <Image
                src={photo1Src}
                alt={mosaic.photo1Alt || "Royal Candy & Chocolate luxury confectionery digital catalog"}
                width={1080}
                height={800}
                sizes="(max-width: 768px) 150px, 260px"
                priority
                unoptimized={isUnoptimized(photo1Src)}
                className={`mention-photo fit-${photo1Fit}`}
                style={{ objectFit: photo1Fit }}
              />
            </div>
          </Link>

          {/* Photo 2: Bottom-Left (Amigos Gym & Fitness Management Suite) */}
          <Link
            href="/portfolio#gym-management"
            className="mention-card card-gym-crop"
            aria-label="View Amigos Gym Management Platform"
          >
            <div className="mention-img-frame">
              <Image
                src={photo2Src}
                alt={mosaic.photo2Alt || "Amigos Gym management platform SaaS dashboard"}
                width={1200}
                height={680}
                sizes="(max-width: 768px) 150px, 260px"
                unoptimized={isUnoptimized(photo2Src)}
                className={`mention-photo fit-${photo2Fit}`}
                style={{ objectFit: photo2Fit }}
              />
            </div>
          </Link>
        </div>

        {/* Column 2: Right Column (Starts at top, prominent flagship cards) */}
        <div className="mention-col col-right">
          {/* Photo 3: Top-Right (Akiba ERP Flagship Enterprise Financial & Inventory Ledger) */}
          <Link
            href="/portfolio#akiba-erp"
            className="mention-card card-erp-main"
            aria-label="View Akiba ERP Financial & Inventory Platform"
          >
            <div className="mention-img-frame">
              <Image
                src={photo3Src}
                alt={mosaic.photo3Alt || "Akiba ERP multi-location inventory and real-time ledger audit"}
                width={1200}
                height={730}
                sizes="(max-width: 768px) 100vw, 380px"
                priority
                unoptimized={isUnoptimized(photo3Src)}
                className={`mention-photo fit-${photo3Fit}`}
                style={{ objectFit: photo3Fit }}
              />
            </div>
          </Link>

          {/* Photo 4: Bottom-Right (Tway Real Estate Modern Property Listings) */}
          <Link
            href="/portfolio#tway-realestate"
            className="mention-card card-team-collab"
            aria-label="View Tway Real Estate Modern Property Listings Platform"
          >
            <div className="mention-img-frame">
              <Image
                src={photo4Src}
                alt={mosaic.photo4Alt || "Tway Real Estate modern property listings and buyer inquiry portal"}
                width={1200}
                height={650}
                sizes="(max-width: 768px) 100vw, 380px"
                unoptimized={isUnoptimized(photo4Src)}
                className={`mention-photo fit-${photo4Fit}`}
                style={{ objectFit: photo4Fit }}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
