import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { Aperture } from "./Aperture";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-secondary/95 backdrop-blur border-b border-border py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <a href="#home" aria-label="Esha Photography & Management — home" className="flex items-center">
          <Aperture
            className={`w-auto transition-all duration-500 ${solid ? "h-9" : "h-11 sm:h-12"}`}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label-xs text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="gold-fill label-xs rounded-full px-5 py-2.5 font-medium text-primary-foreground transition-transform hover:scale-[1.04] active:scale-95"
          >
            Book Now
          </a>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="text-gold md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-72 border-l border-border bg-secondary px-6 py-6 md:hidden"
          >
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} className="text-gold" aria-label="Close menu">
                <X className="h-7 w-7" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="label-xs text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="gold-fill label-xs mt-2 rounded-full px-5 py-3 text-center font-medium text-primary-foreground"
              >
                Book Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
