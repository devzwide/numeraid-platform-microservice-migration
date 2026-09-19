import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E8E6F0] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Numeraid home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6D4AFF] text-lg font-bold text-white">
                N
              </div>

              <span className="text-xl font-bold tracking-tight text-[#17152B]">
                Numeraid
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#6F6C7F]">
              Your digital companion for overcoming dyscalculia and building
              confidence with numbers through clear, accessible, and
              personalized learning tools.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {/* Social buttons can be connected later */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E6F0] text-[#6F6C7F] transition-colors hover:border-[#6D4AFF] hover:text-[#6D4AFF]"
              >
                <span className="text-sm font-semibold">IG</span>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E6F0] text-[#6F6C7F] transition-colors hover:border-[#6D4AFF] hover:text-[#6D4AFF]"
              >
                <span className="text-sm font-semibold">in</span>
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E6F0] text-[#6F6C7F] transition-colors hover:border-[#6D4AFF] hover:text-[#6D4AFF]"
              >
                <span className="text-sm font-semibold">X</span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-[#17152B]">Product</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/#features"
                  className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="/#about"
                  className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
                >
                  About Numeraid
                </a>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
                >
                  Get started
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-[#17152B]">Support</h3>

            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="mailto:support@numeraid.com"
                  className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
                >
                  support@numeraid.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+15551234567"
                  className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
                >
                  +1 (555) 123-4567
                </a>
              </li>

              <li className="text-sm leading-6 text-[#6F6C7F]">
                123 Learning Lane
                <br />
                Education City, SA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#E8E6F0] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6F6C7F]">
            © {currentYear} Numeraid. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-sm text-[#6F6C7F] transition-colors hover:text-[#6D4AFF]"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
