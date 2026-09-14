import { type FormEvent, useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        try {
            const resp = await fetch(`/forgotPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (resp.ok) {
                setMessage("If that address is registered, a reset email was sent.");
            } else if (resp.status === 400) {
                const data = await resp.json();
                setMessage(data?.title ?? "Invalid request.");
            } else {
                setMessage(`Failed: ${resp.status}`);
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>

            {message && <div role="status">{message}</div>}

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <br />
            <br />

            <button type="submit">Send Reset Link</button>
        </form>
    );
};

export default ForgotPassword;
