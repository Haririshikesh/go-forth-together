import logo from "@/assets/1771814125966.png";
import imgEternal from "@/assets/WhatsApp Image 2026-09-05 at 21.00.09.jpeg";
import imgHeart from "@/assets/WhatsApp Image 2026-09-05 at 20.57.26.jpeg";
import imgForever from "@/assets/WhatsApp Image 2026-09-05 at 21.00.10(1).jpeg";
import imgRingExchange from "@/assets/WhatsApp Image 2026-09-05 at 21.00.07.jpeg";
import imgMatGlow from "@/assets/WhatsApp Image 2026-09-05 at 21.00.11.jpeg";
import imgMatCouple from "@/assets/WhatsApp Image 2026-09-05 at 21.00.11(1).jpeg";
import imgMatGrace from "@/assets/WhatsApp Image 2026-09-05 at 21.00.09(1).jpeg";
import imgBabyGrass from "@/assets/WhatsApp Image 2026-09-05 at 21.00.10.jpeg";
import imgBabyWonder from "@/assets/WhatsApp Image 2026-09-05 at 20.57.20.jpeg";
import imgBabySunlit from "@/assets/WhatsApp Image 2026-09-05 at 20.57.21.jpeg";

export const site = {
  name: "Esha Photography & Management",
  tagline: "Capturing Moments, Crafting Experiences.",
  phone: "7824804281",
  tel: "tel:+917824804281",
  whatsapp:
    "https://wa.me/917824804281?text=Hi%20Esha%20Photography%2C%20I'd%20like%20to%20know%20more%20about%20your%20packages.",
  instagram: "https://instagram.com/esha.photography2319",
  instagramHandle: "@esha.photography2319",
  location: "West Tambaram, Chennai, Tamil Nadu",
  maps: "https://maps.app.goo.gl/Sodsh8kS5uSgaX6V8",
  logo,
  hero: imgEternal,
};

export type Category = "Weddings" | "Engagement" | "Babies" | "Maternity";

export interface GalleryItem {
  url: string;
  caption: string;
  category: Category;
  aspect?: "square" | "portrait" | "wide";
}

export const aboutImages: GalleryItem[] = [
  { url: imgEternal, caption: "Eternal Togetherness", category: "Weddings", aspect: "portrait" },
  { url: imgBabyGrass, caption: "First Steps in the Grass", category: "Babies", aspect: "portrait" },
  { url: imgMatCouple, caption: "Two Hearts, One Wait", category: "Maternity", aspect: "portrait" },
  { url: imgRingExchange, caption: "The Ring Exchange", category: "Engagement", aspect: "portrait" },
];

export const gallery: GalleryItem[] = [
  { url: imgEternal, caption: "Eternal Togetherness", category: "Weddings", aspect: "portrait" },
  { url: imgMatGlow, caption: "Golden Glow Maternity", category: "Maternity", aspect: "portrait" },
  { url: imgBabyGrass, caption: "First Steps in the Grass", category: "Babies", aspect: "portrait" },
  { url: imgRingExchange, caption: "The Ring Exchange", category: "Engagement", aspect: "portrait" },
  { url: imgHeart, caption: "Heartcrafted Reception", category: "Weddings", aspect: "portrait" },
  { url: imgMatCouple, caption: "Two Hearts, One Wait", category: "Maternity", aspect: "portrait" },
  { url: imgForever, caption: "Forever & Always", category: "Engagement", aspect: "wide" },
  { url: imgBabyWonder, caption: "Little Wonder", category: "Babies", aspect: "portrait" },
  { url: imgMatGrace, caption: "Moments of Anticipation", category: "Maternity", aspect: "portrait" },
  { url: imgBabySunlit, caption: "Sunlit Curls", category: "Babies", aspect: "portrait" },
];

export const services = [
  { title: "Wedding Photography", desc: "Full-day candid & traditional coverage." },
  { title: "Engagement & Reception", desc: "Cinematic couple coverage." },
  { title: "Baby & Kids Photography", desc: "Outdoor, natural, playful portraits." },
  { title: "Maternity & Baby Shower", desc: "Elegant maternity portraits." },
  { title: "Couple / Pre-Wedding", desc: "Story-driven sessions." },
  { title: "Event Management", desc: "Planning & coordination, end to end." },
];
