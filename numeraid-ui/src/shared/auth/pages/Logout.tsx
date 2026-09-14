import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const resp = await fetch("/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({}),
            });

            if (resp.ok) {
                navigate("/auth/login");
            } else if (resp.status === 401) {
                setMessage("Not authorized or already signed out.");
                navigate("/auth/login");
            } else {
                setMessage(`Logout failed: ${resp.status}`);
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error while logging out.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Sign out</h2>
            {message && <div role="status">{message}</div>}
            <button onClick={handleLogout} disabled={loading}>
                {loading ? "Signing out..." : "Sign out"}
            </button>
        </div>
    );
};

export default Logout;
