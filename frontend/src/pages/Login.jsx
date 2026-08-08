import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/useAuth";
import { Input, Button } from "../components/ui";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.password) {
      next.password = "Password is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const data = await loginUser(form);
      login(data.token, data.user);
      toast.success("Welcome back!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <p className="font-eyebrow text-xs text-brand">Welcome back</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Log in</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <Input
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={updateField("email")}
          error={errors.email}
          disabled={submitting}
        />

        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          value={form.password}
          onChange={updateField("password")}
          error={errors.password}
          disabled={submitting}
        />

        <Button type="submit" className="w-full" loading={submitting}>
          {submitting ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line dark:bg-line-night" />
        <span className="text-xs text-ink-soft dark:text-ink-night-soft">or</span>
        <span className="h-px flex-1 bg-line dark:bg-line-night" />
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
        Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-ink-soft dark:text-ink-night-soft">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
