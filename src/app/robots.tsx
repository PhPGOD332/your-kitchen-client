import { CLIENT_URL, pagesLinks } from "@/shared/constants";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          pagesLinks.main,
          pagesLinks.portfolio,
          `${pagesLinks.portfolio}/`,
          `${pagesLinks.portfolio}/*`,
          pagesLinks.articles,
          `${pagesLinks.articles}/`,
          `${pagesLinks.articles}/*`,
          pagesLinks.advantages,
          `${pagesLinks.advantages}/`,
          pagesLinks.furniture,
          `${pagesLinks.furniture}/`,
          pagesLinks.discounts,
          `${pagesLinks.discounts}/`,
          pagesLinks.contacts,
          `${pagesLinks.contacts}/`,
          `${pagesLinks.departureMeasurer}`
        ],
        disallow: [
          `${pagesLinks.admin}/`,
          "/*?*",
          `${pagesLinks.advantages}/*?*`,
          `${pagesLinks.furniture}/*?*`,
          `${pagesLinks.thankyou}/*?*`,
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          pagesLinks.main,
          pagesLinks.portfolio,
          `${pagesLinks.portfolio}/`,
          `${pagesLinks.portfolio}/*`,
          pagesLinks.articles,
          `${pagesLinks.articles}/`,
          `${pagesLinks.articles}/*`,
          pagesLinks.advantages,
          `${pagesLinks.advantages}/`,
          pagesLinks.furniture,
          `${pagesLinks.furniture}/`,
          pagesLinks.discounts,
          `${pagesLinks.discounts}/`,
          pagesLinks.contacts,
          `${pagesLinks.contacts}/`,
          `${pagesLinks.departureMeasurer}`
        ],
        disallow: [
          `${pagesLinks.admin}/`,
          "/*?*",
          `${pagesLinks.advantages}/*?*`,
          `${pagesLinks.furniture}/*?*`,
          `${pagesLinks.thankyou}/*?*`,
        ],
      },
    ],
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
