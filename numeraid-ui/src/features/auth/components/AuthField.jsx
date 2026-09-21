import { useId, useState } from "react";

const baseInputClassName =
  "w-full rounded-2xl border bg-white px-3.5 py-3 text-sm text-[#17152B] placeholder:text-[#6F6C7F] shadow-sm outline-none transition focus:border-[#6D4AFF] focus:ring-4 focus:ring-[#6D4AFF]/10 disabled:cursor-not-allowed disabled:bg-[#F8F7FC]";

export const AuthField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  autoComplete,
  disabled,
  placeholder,
  minLength,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = `${name || generatedId}-field`;
  const isPassword = type === "password";

  return (
    <label htmlFor={inputId} className="block text-left">
      <span className="mb-2 block text-sm font-semibold text-[#17152B]">{label}</span>

      <div className="relative">
        <input
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`${baseInputClassName} ${
            error ? "border-[#D6455D] focus:border-[#D6455D] focus:ring-[#D6455D]/10" : "border-[#E8E6F0]"
          } ${isPassword ? "pr-12" : ""}`}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-3 flex items-center justify-center rounded-md px-1 text-xs font-semibold text-[#6F6C7F] transition hover:text-[#6D4AFF] focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]/20"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-[#D6455D]" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
};

export const PasswordRequirements = ({ password = "" }) => {
  const requirements = [
    { label: "8 characters minimum", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /\d/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-4 rounded-2xl border border-[#E8E6F0] bg-[#F8F7FC] p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6F6C7F]">
        Password requirements
      </p>

      <ul className="space-y-1.5 text-sm text-[#6F6C7F]">
        {requirements.map((requirement) => (
          <li key={requirement.label} className="flex items-center gap-2">
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                requirement.valid ? "bg-[#E9F7EE] text-[#16855C]" : "bg-[#F0EEF9] text-[#6F6C7F]"
              }`}
            >
              {requirement.valid ? "✓" : "•"}
            </span>
            <span>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
