import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
        navigate("/login", { replace: true });
        return;
    }

    localStorage.setItem("access_token", token);

    window.location.href = "/";
}, [navigate]);

return React.createElement(
    "div",
    { className: "flex items-center justify-center min-h-screen" },
    React.createElement("p", null, "Signing you in...")
  );
}