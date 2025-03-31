export const links = [
  { link: "Home", path: "/" },
  { link: "About Us", path: "/about" },
  { link: "Delivery", path: "/faqs" },
  { link: "Privacy Policy", path: "/privacy" },
];

export const quickLinks = [
  { link: "FAQs", path: "/faqs" },
  { link: "Terms & Conditions", path: "/terms" },
  { link: "Shipping", path: "/faqs" },
];

export const socials = [
  { link: "Instagram" },
  { link: "Facebook" },
  { link: "WhatsApp" },
  { link: "TikTok" },
];

export function getDate() {
  const currentYear = new Date().getFullYear();
  return currentYear;
}
