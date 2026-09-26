"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `display text-sm tracking-widest transition-colors ${
      isActive(href)
        ? "text-acid border-b-2 border-acid pb-1"
        : "text-muted hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        {/* brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="display text-xl text-white">
            Fit<span className="text-acid">Log</span>
          </span>
        </Link>

        {/* nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* both counters go to the plan page */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="display rounded-full bg-acid px-4 py-1.5 text-xs text-ink transition hover:brightness-110"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="display rounded-full border border-line px-4 py-1.5 text-xs text-white transition hover:border-acid hover:text-acid"
          >
            Saved {saved.length}
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="ml-1 text-2xl text-white md:hidden"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {menuOpen && (
        <ul className="flex flex-col gap-4 border-t border-line px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
