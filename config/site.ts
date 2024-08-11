export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TsukiShiro",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "หน้าหลัก",
      href: "/home",
    },
    {
      label: "บอร์ดปัญหา",
      href: "/board-advice",
    },
    {
      label: "บอร์ดหัวข้อ",
      href: "/board-topic",
    },
    {
      label: "บอร์ดของฉัน",
      href: "/my-board",
      isAuth: true,
    },
  ],
  navMenuItems: [
    {
      label: "หน้าหลัก",
      href: "/home",
    },
    {
      label: "บอร์ดปัญหา",
      href: "/board-advice",
    },
    {
      label: "บอร์ดหัวข้อ",
      href: "/board-topic",
    },
    {
      label: "บอร์ดของฉัน",
      href: "/my-board",
      isAuth: true,
    },
  ],
  links: {
    github: "https://github.com/patipanice",
    tiktok: "https://www.tiktok.com/@ice_.pr",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
