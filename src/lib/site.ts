import logo from "@/assets/1771814125966.png.asset.json";
import imgEternal from "@/assets/WhatsApp_Image_2026-09-05_at_21.00.09.jpeg.asset.json";
import imgForever from "@/assets/WhatsApp_Image_2026-09-05_at_21.00.10_1.jpeg.asset.json";
import imgBaby1 from "@/assets/WhatsApp_Image_2026-09-05_at_21.00.10.jpeg.asset.json";
import imgBaby2 from "@/assets/WhatsApp_Image_2026-09-05_at_20.57.20.jpeg.asset.json";
import imgBaby3 from "@/assets/WhatsApp_Image_2026-09-05_at_20.57.21.jpeg.asset.json";
import imgHeart from "@/assets/WhatsApp_Image_2026-09-05_at_20.57.26.jpeg.asset.json";
import imgMat1 from "@/assets/WhatsApp_Image_2026-09-05_at_21.00.11.jpeg.asset.json";
import imgMat2 from "@/assets/WhatsApp_Image_2026-09-05_at_21.00.11_1.jpeg.asset.json";

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
  logo: logo.url,
  hero: imgEternal.url,
};

export type Category = "Weddings" | "Engagement" | "Babies" | "Maternity";

export const gallery: { url: string; caption: string; category: Category }[] = [
  { url: imgEternal.url, caption: "Eternal Togetherness", category: "Weddings" },
  { url: imgForever.url, caption: "Forever & Always", category: "Engagement" },
  { url: imgHeart.url, caption: "Heartcrafted Reception", category: "Weddings" },
  { url: imgMat1.url, caption: "Golden Glow Maternity", category: "Maternity" },
  { url: imgMat2.url, caption: "Two Hearts, One Wait", category: "Maternity" },
  { url: imgBaby1.url, caption: "First Steps in the Grass", category: "Babies" },
  { url: imgBaby2.url, caption: "Little Wonder", category: "Babies" },
  { url: imgBaby3.url, caption: "Sunlit Curls", category: "Babies" },
];

export const services = [
  { title: "Wedding Photography", desc: "Full-day candid & traditional coverage." },
  { title: "Engagement & Reception", desc: "Cinematic couple coverage." },
  { title: "Baby & Kids Photography", desc: "Outdoor, natural, playful portraits." },
  { title: "Maternity & Baby Shower", desc: "Elegant maternity portraits." },
  { title: "Couple / Pre-Wedding", desc: "Story-driven sessions." },
  { title: "Event Management", desc: "Planning & coordination, end to end." },
];
