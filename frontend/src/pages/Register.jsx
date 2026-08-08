import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser, loginUser } from "../api/authApi";
import { useAuth } from "../context/useAuth";
import { Input, Button } from "../components/ui";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await registerUser(form);

      // Log the new user straight in for a smooth first run.
      const data = await loginUser({
        email: form.email,
        password: form.password,
      });
      login(data.token, data.user);

      toast.success("Account created!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <p className="font-eyebrow text-xs text-brand">Get started</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">
        Create your account
      </h1>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <Input
          label="Name"
          required
          placeholder="Ada Lovelace"
          value={form.name}
          onChange={updateField("name")}
          error={errors.name}
          disabled={submitting}
        />

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
          placeholder="At least 6 characters"
          value={form.password}
          onChange={updateField("password")}
          error={errors.password}
          disabled={submitting}
        />

        <Button type="submit" className="w-full" loading={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-soft dark:text-ink-night-soft">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brand hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default Register;
