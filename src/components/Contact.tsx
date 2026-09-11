import { useState } from "react";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { site } from "@/lib/site";

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", event: "", date: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Esha Photography!%0AName: ${form.name}%0APhone: ${form.phone}%0AEvent: ${form.event}%0ADate: ${form.date}%0A${form.message}`;
    window.open(`https://wa.me/917824804281?text=${text}`, "_blank");
  };

  const field =
    "w-full rounded-xl border border-border bg-secondary/70 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold";

  return (
    <section id="contact" className="bg-secondary/40 backdrop-blur-xs py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          label="Get in touch"
          title={
            <>
              Let's Capture Your <span className="gold-text">Moments.</span>
            </>
          }
        />

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-3">
          <a
            href={site.tel}
            className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
          >
            <Phone className="h-6 w-6 text-gold" />
            <span>
              <span className="label-xs block text-muted-foreground">Call</span>
              <span className="text-lg">{site.phone}</span>
            </span>
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
          >
            <MessageCircle className="h-6 w-6 text-gold" />
            <span>
              <span className="label-xs block text-muted-foreground">WhatsApp</span>
              <span className="text-lg">Message us</span>
            </span>
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
          >
            <Instagram className="h-6 w-6 text-gold" />
            <span>
              <span className="label-xs block text-muted-foreground">Instagram</span>
              <span className="text-sm">{site.instagramHandle}</span>
            </span>
          </a>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <form
              onSubmit={submit}
              className="space-y-4 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-sm p-6"
            >
              <h3 className="text-xl">Enquiry</h3>
              <input
                required
                placeholder="Your name"
                className={field}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                placeholder="Phone number"
                className={field}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Event type"
                  className={field}
                  value={form.event}
                  onChange={(e) => setForm({ ...form, event: e.target.value })}
                />
                <input
                  type="date"
                  className={field}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <textarea
                rows={3}
                placeholder="Tell us about your event"
                className={field}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="gold-fill w-full rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
              >
                Send on WhatsApp
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Esha Photography location — West Tambaram, Chennai"
                src="https://www.google.com/maps?q=West%20Tambaram%2C%20Chennai&output=embed"
                loading="lazy"
                className="h-72 w-full border-0 lg:h-[calc(100%-72px)]"
              />
              <a
                href={site.maps}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-card px-6 py-5 text-sm text-gold"
              >
                <MapPin className="h-5 w-5" /> Get Directions · {site.location}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
