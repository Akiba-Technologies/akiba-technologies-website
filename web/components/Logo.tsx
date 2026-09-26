import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo.png";

export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Akiba Technologies, home">
      <Image
        className="brand-mark"
        src={logo}
        alt=""
        width={30}
        height={30}
        priority={priority}
      />
      <span className="brand-txt">
        <span className="brand-name">Akiba</span>
        <span className="brand-sub">TECHNOLOGIES</span>
      </span>
    </Link>
  );
}
