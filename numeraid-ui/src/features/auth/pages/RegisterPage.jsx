import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthCard } from "../components/AuthCard";
import { AuthField, PasswordRequirements } from "../components/AuthField";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      nextErrors.password = "Use a stronger password with uppercase, lowercase, a number, and a symbol.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
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
    setSuccessMessage("");

    try {
      await register(form.email.trim(), form.password);
      setSuccessMessage("Your account was created. Email confirmation may be required before you can sign in.");
      setForm({ email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setErrors({ form: error.message || "We could not create your account. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      description="Get started with a secure Numeraid account."
      footer={
        <p>
          Already have an account? {" "}
          <Link to="/login" className="font-semibold text-[#6D4AFF] hover:text-[#5135D4]">
            Sign in
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

        {successMessage ? (
          <div className="rounded-2xl border border-[#B7E4C9] bg-[#F3FBF7] px-3 py-2 text-sm text-[#176C4A]">
            {successMessage}
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
          autoComplete="new-password"
          placeholder="Create a secure password"
          disabled={isSubmitting}
        />

        <AuthField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          placeholder="Confirm your password"
          disabled={isSubmitting}
        />

        <PasswordRequirements password={form.password} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6D4AFF] px-4 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(109,74,255,0.24)] transition hover:bg-[#5135D4] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20 disabled:cursor-not-allowed disabled:bg-[#A79BEF]"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthCard>
  );
};

export default RegisterPage;
