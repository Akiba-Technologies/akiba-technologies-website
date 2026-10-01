import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo.png";

export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Akiba Technologies, home">
      <Image
        className="brand-mark"
        src={logo}
        alt="Akiba Technologies logo"
        width={32}
        height={32}
        priority={priority}
      />
      <span className="brand-txt">
        <span className="brand-name">
          Akiba <span className="brand-tech">Technologies</span>
        </span>
      </span>
    </Link>
  );
}
