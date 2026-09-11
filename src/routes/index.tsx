import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer, FloatingActions } from "@/components/Footer";
import { GoldParticles } from "@/components/GoldParticles";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Preloader } from "@/components/Preloader";
import { SectionDivider } from "@/components/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";

const title = "Esha Photography & Management | Wedding Photographer in Chennai";
const description =
  "West Tambaram, Chennai studio for wedding, engagement, maternity and baby photography. Capturing Moments, Crafting Experiences. Call or WhatsApp 7824804281.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og.jpg" },
    ],
  }),
  component: Index,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  name: "Esha Photography & Management",
  slogan: "Capturing Moments, Crafting Experiences.",
  telephone: "+917824804281",
  address: {
    "@type": "PostalAddress",
    addressLocality: "West Tambaram, Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: ["https://instagram.com/esha.photography2319"],
};

function Index() {
  const isMobile = useIsMobile();

  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Fixed Background Particle & Bokeh Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,#0D0D0D_0%,#141414_50%,#1A1A1A_100%)]"
      >
        <GoldParticles count={isMobile ? 24 : 50} />
      </div>

      {/* Interactive polish components */}
      <Preloader />
      <ScrollProgress />
      <Cursor />

      {/* Page Sections */}
      <Header />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Portfolio />
      <SectionDivider />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
