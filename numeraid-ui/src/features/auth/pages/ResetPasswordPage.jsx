import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { authApi } from "../api/authApi";
import { AuthCard } from "../components/AuthCard";
import { AuthField, PasswordRequirements } from "../components/AuthField";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [form, setForm] = useState({
    email: initialEmail,
    resetCode: searchParams.get("code") || "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationState = useMemo(() => {
    const password = form.newPassword;
    return {
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[^A-Za-z0-9]/.test(password),
    };
  }, [form.newPassword]);

  const validate = () => {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.resetCode.trim()) {
      nextErrors.resetCode = "Reset code is required.";
    }

    if (!form.newPassword) {
      nextErrors.newPassword = "New password is required.";
    } else if (!Object.values(validationState).every(Boolean)) {
      nextErrors.newPassword = "Use a stronger password with the required complexity.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.newPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSuccess("");
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
      await authApi.resetPassword({
        email: form.email.trim(),
        resetCode: form.resetCode.trim(),
        newPassword: form.newPassword,
      });

      setSuccess("Your password has been reset. You can now sign in with your new password.");
      setForm({ email: form.email.trim(), resetCode: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setErrors({ form: error.message || "This password reset link is no longer valid. Please request a new one." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Reset your password"
      description="Create a new password for your Numeraid account."
      footer={
        <p>
          Need to return? {" "}
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

        {success ? (
          <div className="rounded-2xl border border-[#B7E4C9] bg-[#F3FBF7] px-3 py-2 text-sm text-[#176C4A]">
            {success}
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
          label="Reset code"
          name="resetCode"
          type="text"
          value={form.resetCode}
          onChange={handleChange}
          error={errors.resetCode}
          autoComplete="one-time-code"
          placeholder="Enter your reset code"
          disabled={isSubmitting}
        />

        <AuthField
          label="New password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          autoComplete="new-password"
          placeholder="Create a new password"
          disabled={isSubmitting}
        />

        <AuthField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          placeholder="Repeat your new password"
          disabled={isSubmitting}
        />

        <PasswordRequirements password={form.newPassword} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6D4AFF] px-4 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(109,74,255,0.24)] transition hover:bg-[#5135D4] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20 disabled:cursor-not-allowed disabled:bg-[#A79BEF]"
        >
          {isSubmitting ? "Resetting password..." : "Reset password"}
        </button>
      </form>
    </AuthCard>
  );
};

export default ResetPasswordPage;
