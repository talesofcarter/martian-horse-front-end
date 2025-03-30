export const links = [
  { link: "Home", path: "/" },
  { link: "About Us", path: "/orders" },
  { link: "Delivery", path: "/order" },
  { link: "Privacy Policy", path: "/order" },
];

export const quickLinks = [
  { link: "FAQs" },
  { link: "Terms & Conditions" },
  { link: "Shipping" },
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
