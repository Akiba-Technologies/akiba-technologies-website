import Image from "next/image";
import Link from "next/link";

export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Akiba Technologies, home">
      <span className="brand-logo-wrap">
        <Image
          className="brand-logo-img brand-logo-light"
          src="/brand/akiba-logo.svg"
          alt="Akiba Technologies"
          width={116}
          height={30}
          priority={priority}
        />
        <Image
          className="brand-logo-img brand-logo-dark"
          src="/brand/akiba-logo-dark.svg"
          alt="Akiba Technologies"
          width={116}
          height={30}
          priority={priority}
        />
      </span>
      <span className="brand-tech-text">Technologies</span>
    </Link>
  );
}
