import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../routes/LoadingScreen";
import { useToast } from "../contexts/ToastContext";

export function OAuthCallback() {
  const navigate = useNavigate();
  const { completeOAuthLogin } = useAuth();
  const { show } = useToast();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Deliberately no window.location.href/replace/reload here - see
    // AuthContext.completeOAuthLogin for why (iOS WebKit can clear
    // localStorage after an extra hard navigation following a cross-site
    // redirect). Client-side navigate() only.
    completeOAuthLogin(token)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        show({
          type: "error",
          title: "Sign in failed",
          message: "Please try signing in again.",
        });
        navigate("/login", { replace: true });
      });
  }, [navigate, completeOAuthLogin, show]);

  return <LoadingScreen />;
}
