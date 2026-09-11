import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      data-nav-theme="dark"
      className="border-t border-[var(--line-on-dark)] bg-navy-950 pt-16 pb-8"
    >
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-10 border-b border-[var(--line-on-dark)] pb-10">
          <div className="max-w-[280px]">
            <p className="font-serif text-[19px]">Sylo</p>
            <p className="mt-3 text-sm text-stone-400">
              Prep center familiar para vendedores de Amazon, en cualquier
              país.
            </p>
          </div>
          <div className="flex flex-wrap gap-16">
            <div>
              <h4 className="mb-4 text-[13px] uppercase tracking-[0.08em] text-stone-400">
                Sylo
              </h4>
              <Link href="/#services" className="mb-2.5 block text-sm opacity-85">
                Prep Center
              </Link>
              <Link href="/#shop" className="mb-2.5 block text-sm opacity-85">
                Shop
              </Link>
              <Link href="/contacto" className="mb-2.5 block text-sm opacity-85">
                Contact
              </Link>
            </div>
            <div>
              <h4 className="mb-4 text-[13px] uppercase tracking-[0.08em] text-stone-400">
                Follow
              </h4>
              <a
                href="https://www.instagram.com/sylobeautydeals"
                target="_blank"
                rel="noopener"
                className="mb-2.5 block text-sm opacity-85"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-6 text-[13px] text-stone-400">
          <p>© {new Date().getFullYear()} Sylo. All rights reserved.</p>
          <p>Amazon Prep Center &amp; Curated Shop</p>
        </div>
      </div>
    </footer>
  );
}
