import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer, FloatingActions } from "@/components/Footer";

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
      { name: "twitter:card", content: "summary_large_image" },
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
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
