import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E6F0]/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={handleNavClick}
          className="flex shrink-0 items-center"
          aria-label="Numeraid home"
        >
          <img
            src="/numeraid.png"
            alt="Numeraid"
            className="h-auto w-36 object-contain sm:w-40 md:w-44"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? isHome : false;

            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#6D4AFF]"
                    : "text-[#6F6C7F] hover:text-[#6D4AFF]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#17152B] transition-colors hover:bg-[#F8F7FC] focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] focus:ring-offset-2"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-[#6D4AFF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(109,74,255,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#5135D4] hover:shadow-[0_12px_28px_rgba(109,74,255,0.26)] focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] focus:ring-offset-2"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#17152B] transition-colors hover:bg-[#F8F7FC] focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-[#E8E6F0] bg-white transition-all duration-300 ease-out md:hidden ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav
          className="mx-auto max-w-7xl px-4 py-4"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[#6F6C7F] transition-colors hover:bg-[#F8F7FC] hover:text-[#6D4AFF]"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-[#E8E6F0] pt-4">
              <Link
                to="/login"
                onClick={handleNavClick}
                className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-[#17152B] transition-colors hover:bg-[#F8F7FC]"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                onClick={handleNavClick}
                className="rounded-xl bg-[#6D4AFF] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_24px_rgba(109,74,255,0.22)] transition-all hover:bg-[#5135D4]"
              >
                Get started
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
