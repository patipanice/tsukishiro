"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";
import { useAuthContext } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import AuthSection from "./auth-section";
import { Divider } from "@heroui/react";
import { MedalRibbonsStarBoldDuotoneIcon } from "./icons/MedalRibbonsStarBoldDuotoneIcon";

export const Navbar = () => {
  const { user } = useAuthContext();
  const pathname = usePathname();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">TSUKISHIRO</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navItems
            .filter((item: any) => {
              if (item.isAuth) {
                if (user) {
                  return item;
                } else {
                  return false;
                }
              } else {
                return item;
              }
            })
            .map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    pathname.includes(item.href)
                      ? "text-primary-500 border-b-2 border-primary-500 pb-1"
                      : "foreground hover:text-primary-300"
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-4 items-center">
          {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link> */}
          {/* <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link> */}
          {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link> */}
          {/* <Link isExternal aria-label="Tiktok" href={siteConfig.links.tiktok}>
            <GithubIcon className="text-default-500" />
          </Link> */}
          {user && (
            <NextLink href={"/board-stat"}>
              <MedalRibbonsStarBoldDuotoneIcon className="mt-1 text-[22px]" />
            </NextLink>
          )}
          <ThemeSwitch />
          {/* <Avatar className="" size="sm" showFallback src="https://images.unsplash.com/broken" /> */}
          <div className="">
            <AuthSection />
          </div>
        </NavbarItem>
        {/* <NavbarItem className="hidden  lg:flex">{searchInput}</NavbarItem> */}
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link> */}
        {user && (
          <NextLink href={"/board-stat"}>
            <MedalRibbonsStarBoldDuotoneIcon className="text-[22px] mt-1" />
          </NextLink>
        )}
        <ThemeSwitch />
        {/* <AuthSection /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <AuthSection />
          <Divider />
          {siteConfig.navMenuItems
            .filter((item) => {
              if (item.isAuth) {
                if (user) {
                  return item;
                } else {
                  return false;
                }
              } else {
                return item;
              }
            })
            .map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    pathname.includes(item.href) ? "primary" : "foreground"
                  }
                  href={item.href}
                  size="sm"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
