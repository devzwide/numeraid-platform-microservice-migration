import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthCard } from "../components/AuthCard";
import { AuthField } from "../components/AuthField";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(form.email.trim(), form.password);

      const params = new URLSearchParams(location.search);
      const returnUrl = params.get("returnUrl") || "/account";
      navigate(returnUrl, { replace: true });
    } catch (error) {
      setErrors({ form: error.message || "Unable to sign in. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue to your Numeraid account."
      footer={
        <p>
          Need an account? {" "}
          <Link to="/register" className="font-semibold text-[#6D4AFF] hover:text-[#5135D4]">
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {errors.form ? (
          <div className="rounded-2xl border border-[#F1C0C8] bg-[#FFF5F6] px-3 py-2 text-sm text-[#8B2437]">
            {errors.form}
          </div>
        ) : null}

        <AuthField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
        />

        <AuthField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          placeholder="Enter your password"
          disabled={isSubmitting}
        />

        <div className="flex items-center justify-end gap-3 text-sm">
          <Link to="/forgot-password" className="font-semibold text-[#6D4AFF] hover:text-[#5135D4]">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6D4AFF] px-4 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(109,74,255,0.24)] transition hover:bg-[#5135D4] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20 disabled:cursor-not-allowed disabled:bg-[#A79BEF]"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
