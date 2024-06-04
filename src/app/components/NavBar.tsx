"use client";

import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

import CombinationLogo from "./ui/icons/CombinationLogo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Clover from "./ui/icons/Clover";
import Six from "./ui/icons/Six";
import Seven from "./ui/icons/Seven";

const menu = [
  {
    href: "/",
    title: "소개",
    icon: <Clover className="h-6 w-6" />,
  },
  {
    href: "/lotto",
    title: "로또 6/45",
    icon: <Six className="h-6 w-6" />,
  },
  {
    href: "/pension",
    title: "연금복권 720+",
    icon: <Seven className="h-6 w-6" />,
  },
];

export default function NavBar() {
  const pathName = usePathname();

  return (
    <div className="mx-auto flex max-w-screen-lg items-center justify-between bg-background px-6 py-5">
      <Link href="/">
        <CombinationLogo />
      </Link>
      <nav>
        <ul className="hidden gap-4 md:flex">
          {menu.map(({ href, title }) => (
            <li key={title}>
              <Link
                href={href}
                className={`${pathName === href ? "font-bold text-primary" : "text-foreground"} transition-opacity hover:opacity-80`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="fixed bottom-0 left-0 flex w-full justify-evenly rounded-t-xl border-t bg-content1 py-2 shadow-md dark:border-content1 md:hidden">
          {menu.map(({ href, title, icon }) => (
            <li key={title}>
              <Link
                href={href}
                className={`${pathName === href ? "font-bold text-primary" : "text-foreground"} flex flex-col items-center justify-center text-xs transition-opacity hover:opacity-80`}
              >
                {icon}
                <div className="mt-1">{title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}