import Image from "next/image";

interface ClientLogo {
  name: string;
  logo?: string;
  logoDark?: string;
  logoLight?: string;
  width: number;
  height: number;
  className?: string;
}

const CLIENTS: ClientLogo[] = [
  {
    name: "Ethiopian Artificial Intelligence Institute",
    logo: "/clients/ethiopian-ai-institute.png",
    width: 200,
    height: 200,
  },
  {
    name: "TWAY Real Estate",
    logoDark: "/clients/tway-real-estate-dark.png",
    logoLight: "/clients/tway-real-estate.png",
    width: 240,
    height: 144,
  },
  {
    name: "Qudwa Business PLC",
    logo: "/clients/qudwa-business.png",
    width: 160,
    height: 160,
  },
  {
    name: "Amigos Gym",
    logo: "/clients/amigos-gym.png",
    width: 190,
    height: 115,
    className: "trusted-logo-amigos",
  },
  {
    name: "Royal Candy & Chocolate Factory",
    logo: "/clients/royal-candy.png",
    width: 170,
    height: 170,
    className: "trusted-logo-gold",
  },
  {
    name: "NM Company",
    logo: "/clients/nm-company.png",
    width: 220,
    height: 185,
    className: "trusted-logo-nm",
  },
];

export function TrustedBy() {
  return (
    <div className="hero-trusted-dock" aria-label="Trusted by">
      <div className="trusted-by-top">
        <p className="trusted-by-label">Trusted by industry leaders &amp; growing teams</p>
      </div>

      <div className="trusted-marquee-viewport">
        <div className="trusted-marquee-track">
          {/* Repeating groups for perfectly seamless infinite continuous scroll */}
          {[0, 1, 2, 3].map((groupIndex) => (
            <div
              key={groupIndex}
              className="trusted-marquee-group"
              aria-hidden={groupIndex > 0 ? "true" : undefined}
            >
              {CLIENTS.map((client) => (
                <div key={`${client.name}-${groupIndex}`} className="trusted-logo-item" title={client.name}>
                  {client.logoDark && client.logoLight ? (
                    <>
                      <Image
                        src={client.logoDark}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        className={`trusted-logo-img trusted-logo-dark ${client.className || ""}`}
                      />
                      <Image
                        src={client.logoLight}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        className={`trusted-logo-img trusted-logo-light ${client.className || ""}`}
                      />
                    </>
                  ) : (
                    <Image
                      src={client.logo!}
                      alt={client.name}
                      width={client.width}
                      height={client.height}
                      className={`trusted-logo-img ${client.className || ""}`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
