"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#171717]/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-heading font-bold text-xl text-[#E11D48] tracking-tight group-hover:text-[#F43F5E] transition-colors duration-300">
              Talha
            </span>
            <span className="font-heading font-bold text-xl text-[#FAFAFA] tracking-tight">
              Pythoneer
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-0.5 group-hover:scale-150 transition-transform duration-300" />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 block ${
                      isActive ? "text-[#E11D48]" : "text-[#A3A3A3] hover:text-[#FAFAFA]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E11D48] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
            <li className="ml-3">
              <a
                href="https://www.fiverr.com/talhapythoneer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
              >
                Hire Me
              </a>
            </li>
          </ul>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[2px] bg-[#FAFAFA] transition-all duration-300 ${
                menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-[#FAFAFA] transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-4"
              }`}
            />
            <span
              className={`block h-[2px] bg-[#FAFAFA] transition-all duration-300 ${
                menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-5"
              }`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-3xl font-heading font-bold tracking-wide transition-colors duration-300 ${
                    pathname === link.href ? "text-[#E11D48]" : "text-[#FAFAFA] hover:text-[#E11D48]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              href="https://www.fiverr.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-8 py-3 text-base font-semibold text-white bg-[#E11D48] rounded-full"
            >
              Hire Me on Fiverr
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
