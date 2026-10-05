import Image from "next/image";
import Link from "next/link";

export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Akiba, home">
      <span className="brand-logo-wrap">
        <Image
          className="brand-logo-img brand-logo-light"
          src="/brand/akiba-logo.svg"
          alt="Akiba"
          width={124}
          height={32}
          priority={priority}
        />
        <Image
          className="brand-logo-img brand-logo-dark"
          src="/brand/akiba-logo-dark.svg"
          alt="Akiba"
          width={124}
          height={32}
          priority={priority}
        />
      </span>
    </Link>
  );
}
