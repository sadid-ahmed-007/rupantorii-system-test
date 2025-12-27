"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="section-pad border-t border-mist py-10 text-sm text-pine">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg text-ink">Rupantorii</p>
          <p>Elegant Bengali jewelry crafted for modern rituals.</p>
        </div>
        <div className="flex gap-6">
          <span>Dhaka, Bangladesh</span>
          <span>support@rupantorii.test</span>
        </div>
      </div>
    </footer>
  );
}

