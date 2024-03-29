"use client";

import Link from "next/link";
import ThemeSwitch from "./theme-switch";

export function MainNav() {
  return (
    <div className="hidden lg:flex py-4 lg:mx-0 w-full rounded-lg px-6">
      <div className="relative flex items-center justify-between w-full">
        <Link href="/" className="font-heading text-2xl">
          Lunarhike
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}
