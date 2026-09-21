import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { authApi } from "../api/authApi";
import { AuthField } from "../components/AuthField";
import { useAuth } from "../hooks/useAuth";

const AccountPage = () => {
  const { accessToken } = useAuth();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailForm, setEmailForm] = useState({ newEmail: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const loadAccount = async () => {
      if (!accessToken) {
        setIsLoading(false);
        setError("Your session is no longer valid.");
        return;
      }

      try {
        const result = await authApi.getAccountInfo(accessToken);
        setAccount(result);
        setEmailForm({ newEmail: result?.email || "" });
      } catch (requestError) {
        setError(requestError.message || "Unable to load your account details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAccount();
  }, [accessToken]);

  const updateAccount = async (payload) => {
    setIsUpdating(true);
    setStatusMessage("");

    try {
      await authApi.updateAccountInfo(payload, accessToken);
      setStatusMessage("Your account information was updated successfully.");
    } catch (requestError) {
      setStatusMessage(requestError.message || "We could not update your account information.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      setStatusMessage("Please complete the password fields.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setStatusMessage("New password must be at least 8 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setStatusMessage("New passwords do not match.");
      return;
    }

    await updateAccount({
      newPassword: passwordForm.newPassword,
      oldPassword: passwordForm.oldPassword,
    });

    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    if (!emailForm.newEmail.trim()) {
      setStatusMessage("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.newEmail)) {
      setStatusMessage("Enter a valid email address.");
      return;
    }

    await updateAccount({ newEmail: emailForm.newEmail.trim() });
  };

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-[#E8E6F0] bg-white p-8 text-center text-[#6F6C7F] shadow-[0_20px_40px_rgba(35,27,75,0.08)]">
        Loading account information...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#E8E6F0] bg-white p-5 shadow-[0_20px_40px_rgba(35,27,75,0.08)] sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">
              Account
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#17152B]">
              Profile & security
            </h1>
          </div>

          <Link
            to="/account/security"
            className="inline-flex items-center justify-center rounded-2xl border border-[#E8E6F0] bg-[#F8F7FC] px-4 py-2.5 text-sm font-semibold text-[#17152B] transition hover:border-[#6D4AFF] hover:text-[#6D4AFF]"
          >
            Security settings
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-[#F1C0C8] bg-[#FFF5F6] px-3 py-2 text-sm text-[#8B2437]">
          {error}
        </div>
      ) : null}

      {statusMessage ? (
        <div className="rounded-2xl border border-[#B7E4C9] bg-[#F3FBF7] px-3 py-2 text-sm text-[#176C4A]">
          {statusMessage}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-[#E8E6F0] bg-white p-5 shadow-[0_20px_40px_rgba(35,27,75,0.08)] sm:p-7">
          <h2 className="text-xl font-bold text-[#17152B]">Profile</h2>
          <p className="mt-2 text-sm text-[#6F6C7F]">Update your account email and profile details.</p>

          <form onSubmit={handleEmailSubmit} className="mt-5 space-y-5">
            <AuthField
              label="Email"
              name="newEmail"
              type="email"
              value={emailForm.newEmail}
              onChange={(event) => setEmailForm({ newEmail: event.target.value })}
              autoComplete="email"
              disabled={isUpdating}
            />

            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6D4AFF] px-4 py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(109,74,255,0.24)] transition hover:bg-[#5135D4] disabled:cursor-not-allowed disabled:bg-[#A79BEF]"
            >
              {isUpdating ? "Saving..." : "Save email"}
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-[#E8E6F0] bg-white p-5 shadow-[0_20px_40px_rgba(35,27,75,0.08)] sm:p-7">
          <h2 className="text-xl font-bold text-[#17152B]">Password</h2>
          <p className="mt-2 text-sm text-[#6F6C7F]">Keep your account secure by changing your password.</p>

          <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-5">
            <AuthField
              label="Current password"
              name="oldPassword"
              type="password"
              value={passwordForm.oldPassword}
              onChange={(event) => setPasswordForm((current) => ({ ...current, oldPassword: event.target.value }))}
              autoComplete="current-password"
              disabled={isUpdating}
            />

            <AuthField
              label="New password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
              autoComplete="new-password"
              disabled={isUpdating}
            />

            <AuthField
              label="Confirm new password"
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
              autoComplete="new-password"
              disabled={isUpdating}
            />

            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-[#E8E6F0] bg-[#F8F7FC] px-4 py-3 text-base font-semibold text-[#17152B] transition hover:border-[#6D4AFF] hover:text-[#6D4AFF] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUpdating ? "Updating..." : "Change password"}
            </button>
          </form>
        </section>
      </div>

      <section className="rounded-[2rem] border border-[#E8E6F0] bg-white p-5 shadow-[0_20px_40px_rgba(35,27,75,0.08)] sm:p-7">
        <h2 className="text-xl font-bold text-[#17152B]">Account status</h2>
        <dl className="mt-4 space-y-3 text-sm text-[#6F6C7F]">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E8E6F0] bg-[#F8F7FC] px-4 py-3">
            <dt className="font-medium text-[#17152B]">Email</dt>
            <dd>{account?.email || "Not available"}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
};

export default AccountPage;
