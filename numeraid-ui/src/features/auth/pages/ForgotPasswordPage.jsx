import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthCard } from "../components/AuthCard";
import { AuthField } from "../components/AuthField";
import { authApi } from "../api/authApi";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await authApi.forgotPassword({ email: email.trim() });
      setSuccess("If this account exists, we have sent password reset instructions to your email.");
      setEmail("");
    } catch (submitError) {
      setError(submitError.message || "We could not send reset instructions right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Forgot your password?"
      description="Enter your email and we'll send you instructions to reset your password."
      footer={
        <p>
          Remembered it? {" "}
          <Link to="/login" className="font-semibold text-[#6D4AFF] hover:text-[#5135D4]">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error ? (
          <div className="rounded-2xl border border-[#F1C0C8] bg-[#FFF5F6] px-3 py-2 text-sm text-[#8B2437]">
            {error}
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email address." : ""}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6D4AFF] px-4 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(109,74,255,0.24)] transition hover:bg-[#5135D4] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20 disabled:cursor-not-allowed disabled:bg-[#A79BEF]"
        >
          {isSubmitting ? "Sending instructions..." : "Send reset link"}
        </button>
      </form>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
