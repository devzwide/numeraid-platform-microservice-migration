import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { authApi } from "../api/authApi";
import { AuthCard } from "../components/AuthCard";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(() => {
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");

    if (!userId || !code) {
      return "invalid";
    }

    return "confirming";
  });
  const [message, setMessage] = useState(() => {
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");

    if (!userId || !code) {
      return "This confirmation link is missing required information.";
    }

    return "Confirming your email address...";
  });

  useEffect(() => {
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");
    const returnUrl = searchParams.get("returnUrl");

    if (!userId || !code) {
      return;
    }

    const runConfirmation = async () => {
      try {
        await authApi.confirmEmail(userId, code, returnUrl || undefined);
        setStatus("success");
        setMessage("Your email address has been confirmed.");
      } catch (error) {
        setStatus("failed");
        setMessage(
          error.message || "This email confirmation link is invalid or has expired. Please request a new one."
        );
      }
    };

    runConfirmation();
  }, [searchParams]);

  return (
    <AuthCard
      title={status === "success" ? "Email confirmed" : status === "invalid" ? "Invalid confirmation link" : status === "failed" ? "Confirmation failed" : "Confirming your email"}
      description={message}
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/login" className="font-semibold text-[#6D4AFF] hover:text-[#5135D4]">
            Continue to sign in
          </Link>

          {status === "failed" || status === "invalid" ? (
            <Link to="/resend-confirmation" className="font-semibold text-[#17152B] hover:text-[#6D4AFF]">
              Request a new link
            </Link>
          ) : null}
        </div>
      }
    >
      <div className="rounded-2xl border border-[#E8E6F0] bg-[#F8F7FC] p-4 text-sm text-[#6F6C7F]">
        {status === "confirming" ? "Please wait while we verify your confirmation link." : null}
        {status === "success" ? "You can now sign in and continue using Numeraid." : null}
        {status === "failed" || status === "invalid" ? "Please request a fresh confirmation email or sign in to send another one." : null}
      </div>
    </AuthCard>
  );
};

export default ConfirmEmailPage;
