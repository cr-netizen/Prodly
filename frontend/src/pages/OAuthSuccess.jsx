import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/useAuth";
import Loader from "../components/ui/Loader";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token, null);
      toast.success("Signed in with Google!");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error("Google sign-in failed. Please try again.");
      navigate("/login", { replace: true });
    }
  }, [login, navigate]);

  return <Loader fullScreen label="Signing you in…" />;
}

export default OAuthSuccess;
