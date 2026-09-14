import { type FormEvent, useState } from "react";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);

    const handleProblemDetails = async (resp: Response) => {
        try {
            const data = await resp.json();
            if (data?.errors) {
                const errors = Object.values(data.errors)
                    .flat()
                    .join("\n");
                return errors;
            }
            return data?.title ?? "Validation error";
        } catch {
            return `Request failed: ${resp.status}`;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        try {
            const resp = await fetch(`/login?useCookies=true`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (resp.ok) {
                setMessage("Login successful.");
            } else if (resp.status === 400) {
                const err = await handleProblemDetails(resp);
                setMessage(err);
            } else {
                setMessage(`Login failed: ${resp.status}`);
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error during login.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            {message && <div role="status">{message}</div>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <br />
            <br />

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
