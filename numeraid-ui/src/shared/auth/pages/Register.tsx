import { useState } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";

const Register = (): JSX.Element => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [message, setMessage] = useState<string | null>(null);

    const handleProblemDetails = async (resp: Response) => {
        try {
            const data = await resp.json();
            if (data?.errors) {
                return Object.values(data.errors).flat().join("\n");
            }
            return data?.title ?? "Validation error";
        } catch {
            return `Request failed: ${resp.status}`;
        }
    };

    const validateForm = (): boolean => {
        if (!email || !password || !confirmPassword) {
            setMessage("Please fill in all required fields.");
            return false;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setMessage(null);

        if (!validateForm()) return;

        try {
            const resp = await fetch(`/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (resp.ok) {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setMessage("Registration successful. Check your email to confirm your account.");
            } else if (resp.status === 400) {
                const err = await handleProblemDetails(resp);
                setMessage(err);
            } else {
                setMessage(`Registration failed: ${resp.status}`);
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error during registration.");
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <div>
                <label htmlFor="name">Name:</label>
                <br />
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />
            </div>

            <br />

            <div>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                />
            </div>

            <br />

            <div>
                <label htmlFor="password">Password:</label>
                <br />
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
            </div>

            <br />

            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <br />
                <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                    }
                />
            </div>

            <br />

            <div>
                <input
                    id="showPassword"
                    type="checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                />
                <label htmlFor="showPassword"> Show Passwords</label>
            </div>

            <br />

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
