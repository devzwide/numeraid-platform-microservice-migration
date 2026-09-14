import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState<string | null>("Confirming your email...");

    useEffect(() => {
        const userId = searchParams.get("userId");
        const code = searchParams.get("code");
        const changedEmail = searchParams.get("changedEmail");

        if (!userId || !code) {
            setMessage("Missing confirmation parameters.");
            return;
        }

        const query = new URLSearchParams({ userId, code });
        if (changedEmail) query.set("changedEmail", changedEmail);

        fetch(`/confirmEmail?${query.toString()}`)
            .then(async (resp) => {
                if (resp.ok) {
                    const text = await resp.text();
                    setMessage(text || "Email confirmed.");
                } else {
                    setMessage(`Confirmation failed: ${resp.status}`);
                }
            })
            .catch((err) => {
                console.error(err);
                setMessage("Network error while confirming email.");
            });
    }, [searchParams]);

    return (
        <>
            <h2>Email Confirmation</h2>
            <p>{message}</p>
        </>
    );
};

export default ConfirmEmail;
