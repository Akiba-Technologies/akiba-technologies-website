import Image from "next/image";

const CLIENTS = [
  {
    name: "Qudwa Business PLC",
    logo: "/clients/qudwa-business.png",
    width: 150,
    height: 150,
  },
  {
    name: "Amigos Gym",
    logo: "/clients/amigos-gym.png",
    width: 182,
    height: 110,
  },
  {
    name: "Royal Candy & Chocolate Factory",
    logo: "/clients/royal-candy.png",
    width: 160,
    height: 160,
  },
  {
    name: "NM",
    logo: "/clients/nm-company.png",
    width: 267,
    height: 225,
  },
];

export function TrustedBy() {
  return (
    <section className="trusted-by-strip" aria-label="Trusted by">
      <div className="wrap">
        <div className="trusted-by-top">
          <p className="trusted-by-label">Trusted by</p>
        </div>
        <div className="trusted-by-grid">
          {CLIENTS.map((client) => (
            <div key={client.name} className="trusted-logo-col">
              <div className="trusted-logo-item">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="trusted-logo-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
