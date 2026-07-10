import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function OAuthCallback() {
  const navigate = useNavigate();
  const { completeOAuthLogin } = useAuth();
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Deliberately no window.location.href/replace/reload here. On iOS
    // WebKit (Safari and Chrome, which share the same engine on iOS), an
    // additional full-page navigation immediately after returning from a
    // cross-site redirect (Google -> here) can be treated as a tracking
    // "bounce," which may clear localStorage for this origin right after
    // we write the token - wiping it before the app ever reads it back.
    // completeOAuthLogin() updates auth state directly, in-memory, with
    // no further navigation for WebKit to flag.
    completeOAuthLogin(token)
      .then(() => {
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        setError(true);
        localStorage.removeItem("access_token");
        navigate("/login", { replace: true });
      });
  }, [navigate, completeOAuthLogin]);

  if (error) {
    return <p>Sign in failed. Redirecting...</p>;
  }

  return <p>Signing you in...</p>;
}