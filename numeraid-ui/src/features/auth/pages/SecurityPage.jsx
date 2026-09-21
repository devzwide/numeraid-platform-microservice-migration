import { useState } from "react";
import { Link } from "react-router-dom";

import { authApi } from "../api/authApi";
import { AuthField } from "../components/AuthField";
import { useAuth } from "../hooks/useAuth";

const SecurityPage = () => {
  const { accessToken } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      await authApi.setTwoFactor(
        {
          enable: !twoFactorEnabled,
          twoFactorCode: verificationCode,
        },
        accessToken
      );

      const nextValue = !twoFactorEnabled;
      setTwoFactorEnabled(nextValue);
      setVerificationCode("");
      setStatus(nextValue ? "Two-factor authentication is now enabled." : "Two-factor authentication has been disabled.");
    } catch (requestError) {
      setStatus(requestError.message || "We could not update your two-factor settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#E8E6F0] bg-white p-5 shadow-[0_20px_40px_rgba(35,27,75,0.08)] sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">Security</p>
            <h1 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#17152B]">Two-factor authentication</h1>
          </div>

          <Link
            to="/account"
            className="inline-flex items-center justify-center rounded-2xl border border-[#E8E6F0] bg-[#F8F7FC] px-4 py-2.5 text-sm font-semibold text-[#17152B] transition hover:border-[#6D4AFF] hover:text-[#6D4AFF]"
          >
            Back to account
          </Link>
        </div>
      </div>

      <section className="rounded-[2rem] border border-[#E8E6F0] bg-white p-5 shadow-[0_20px_40px_rgba(35,27,75,0.08)] sm:p-7">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E8E6F0] bg-[#F8F7FC] px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-[#17152B]">Current status</div>
            <div className="text-sm text-[#6F6C7F]">
              {twoFactorEnabled ? "Enabled" : "Not enabled"}
            </div>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ${
              twoFactorEnabled ? "bg-[#E9F7EE] text-[#16855C]" : "bg-[#F1EEF9] text-[#6F6C7F]"
            }`}
          >
            {twoFactorEnabled ? "Protected" : "Off"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <AuthField
            label={twoFactorEnabled ? "Verification code" : "Verification code (optional)"}
            name="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
            placeholder={twoFactorEnabled ? "Enter the 6-digit code" : "Enter code if required"}
            disabled={isSubmitting}
          />

          {status ? (
            <div
              className={`rounded-2xl border px-3 py-2 text-sm ${
                status.toLowerCase().includes("enabled") || status.toLowerCase().includes("disabled")
                  ? "border-[#B7E4C9] bg-[#F3FBF7] text-[#176C4A]"
                  : "border-[#F1C0C8] bg-[#FFF5F6] text-[#8B2437]"
              }`}
            >
              {status}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6D4AFF] px-4 py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(109,74,255,0.24)] transition hover:bg-[#5135D4] disabled:cursor-not-allowed disabled:bg-[#A79BEF]"
          >
            {isSubmitting ? "Updating security settings..." : twoFactorEnabled ? "Disable two-factor authentication" : "Enable two-factor authentication"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default SecurityPage;
