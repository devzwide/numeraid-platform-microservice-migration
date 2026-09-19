import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E8E6F0] bg-white/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <Link
              to="/"
              className="inline-flex shrink-0 items-center"
              aria-label="Numeraid home"
            >
              <img
                src="/numeraid.png"
                alt="Numeraid"
                className="h-auto w-36 object-contain sm:w-40"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#6F6C7F]">
              Numeraid helps people understand numbers with calm, practical
              support designed for everyday learning and long-term confidence.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/numeraid"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8E6F0] text-sm font-semibold text-[#6F6C7F] transition-all hover:border-[#6D4AFF] hover:bg-[#F8F7FC] hover:text-[#6D4AFF]"
              >
                IG
              </a>

              <a
                href="https://www.linkedin.com/company/numeraid"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8E6F0] text-sm font-semibold text-[#6F6C7F] transition-all hover:border-[#6D4AFF] hover:bg-[#F8F7FC] hover:text-[#6D4AFF]"
              >
                in
              </a>

              <a
                href="https://x.com/numeraid"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8E6F0] text-sm font-semibold text-[#6F6C7F] transition-all hover:border-[#6D4AFF] hover:bg-[#F8F7FC] hover:text-[#6D4AFF]"
              >
                X
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#17152B]">
              Product
            </h3>

            <ul className="mt-4 space-y-3">
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
                  About
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

          <div>
            <h3 className="text-sm font-semibold text-[#17152B]">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-[#6F6C7F]">
              <li>
                <a
                  href="mailto:support@numeraid.co.za"
                  className="transition-colors hover:text-[#6D4AFF]"
                >
                  support@numeraid.co.za
                </a>
              </li>

              <li>
                <a
                  href="tel:+27105002486"
                  className="transition-colors hover:text-[#6D4AFF]"
                >
                  +27 10 500 2486
                </a>
              </li>

              <li className="leading-6">
                18 Digital Learning Avenue
                <br />
                Rosebank
                <br />
                Johannesburg, Gauteng 2196
                <br />
                South Africa
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#E8E6F0] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6F6C7F]">
            © {currentYear} Numeraid. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm text-[#6F6C7F]">
            <a
              href="/privacy"
              className="transition-colors hover:text-[#6D4AFF]"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="transition-colors hover:text-[#6D4AFF]"
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