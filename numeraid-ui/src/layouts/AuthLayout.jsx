import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-6 text-[#17152B] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="Numeraid home">
            <img src="/numeraid.png" alt="Numeraid" className="h-auto w-24 sm:w-28" />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-[#E8E6F0] bg-white px-3 py-2 text-sm font-semibold text-[#17152B] transition hover:border-[#6D4AFF] hover:text-[#6D4AFF]"
          >
            Return home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>

        <footer className="pt-2 text-center text-xs text-[#6F6C7F]">
          Secure access for your Numeraid account.
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
