import { Baby, CalendarCheck, Camera, Gem, Heart, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { services } from "@/lib/site";

const icons = [Camera, Gem, Baby, Sparkles, Heart, CalendarCheck];

export function Services() {
  return (
    <section id="services" className="bg-secondary/40 backdrop-blur-xs py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label="What we do" title="Services" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50">
                  <Icon className="h-8 w-8 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-5 text-xl font-medium">{s.title}</h3>
                  <div className="gold-rule mt-3 w-10 origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-[3.2]" />
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
