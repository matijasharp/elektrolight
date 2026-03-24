import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["hr", "en", "de"],
  defaultLocale: "hr",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
