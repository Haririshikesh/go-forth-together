import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <img
            src={site.logo}
            alt="Esha Photography & Management logo"
            className="h-14 w-auto rounded-md bg-background/60 p-1"
          />
          <p className="mt-4 font-script text-xl text-gold">{site.tagline}</p>
        </div>
        <nav className="flex flex-col gap-3">
          <p className="label-xs text-gold">Explore</p>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-gold">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <p className="label-xs text-gold">Reach us</p>
          <a href={site.tel} className="flex items-center gap-2 hover:text-gold">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-gold"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-gold"
          >
            <Instagram className="h-4 w-4" /> {site.instagramHandle}
          </a>
          <a
            href={site.maps}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-gold"
          >
            <MapPin className="h-4 w-4" /> {site.location}
          </a>
        </div>
      </div>
      <div className="gold-rule mx-auto mt-10 max-w-6xl" />
      <p className="mt-6 text-center text-xs text-muted-foreground">
        © 2026 Esha Photography &amp; Management. All rights reserved.
      </p>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="animate-pulse-gold gold-fill flex h-13 w-13 items-center justify-center rounded-full text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={site.tel}
        aria-label="Call us"
        className="flex h-13 w-13 items-center justify-center rounded-full border border-gold bg-secondary text-gold shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
