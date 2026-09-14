import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();

    const email = searchParams.get("email") ?? "";
    const resetCode = searchParams.get("code") ?? "";

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validateForm = (): boolean => {
        if (!newPassword || !confirmPassword) {
            alert("Please fill in all fields.");
            return false;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(
                "/resetPassword",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        resetCode,
                        newPassword,
                    }),
                }
            );

            if (response.ok) {
                setNewPassword("");
                setConfirmPassword("");
                alert("Password reset successfully.");
                return;
            }

            if (response.status === 400) {
                try {
                    const data = await response.json();
                    if (data?.errors) {
                        const err = Object.values(data.errors).flat().join("\n");
                        alert(err);
                        return;
                    }
                    alert(data?.title ?? "Failed to reset password.");
                    return;
                } catch {
                    alert("Failed to reset password.");
                    return;
                }
            }

            throw new Error(`Failed to reset password: ${response.status}`);
        } catch (error) {
            console.error(error);
            alert("Unable to reset password.");
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword((previous) => !previous);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>

            <div>
                <label>Email:</label>
                <br />
                <input
                    type="email"
                    value={email}
                    disabled
                />
            </div>

            <br />

            <div>
                <label>New Password:</label>
                <br />
                <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Confirm Password:</label>
                <br />
                <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                />
            </div>

            <br />

            <div>
                <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                />
                <label> Show Password</label>
            </div>

            <br />

            <button type="submit">
                Reset Password
            </button>
        </form>
    );
};

export default ResetPassword;
