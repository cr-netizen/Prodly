import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";

const navLinkClass = ({ isActive }) =>
  [
    "font-eyebrow text-xs px-1 py-2 border-b-2 transition-colors",
    isActive
      ? "border-brand text-ink dark:text-ink-night"
      : "border-transparent text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night",
  ].join(" ");

const mobileLinkClass = ({ isActive }) =>
  [
    "block rounded-md px-3 py-2 text-base font-medium",
    isActive
      ? "bg-paper-soft text-ink dark:bg-paper-night-soft dark:text-ink-night"
      : "text-ink-soft hover:bg-paper-soft dark:text-ink-night-soft dark:hover:bg-paper-night-soft",
  ].join(" ");

function TagLogo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.4 2.6 21 11.2a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0L3 12V3h9.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M4 7h16M4 12h16M4 17h16"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="m6 6 12 12M18 6 6 18"
      />
    </svg>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    ...(isAuthenticated
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/profile", label: "Profile" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur dark:bg-paper-night/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
            <TagLogo />
          </span>
          <span className="font-display text-xl">Prodly</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:text-ink dark:border-line-night dark:text-ink-night-soft dark:hover:text-ink-night"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="text-sm text-ink-soft transition hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
              >
                {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "Account"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper transition hover:bg-ink/90 dark:bg-ink-night dark:text-paper-night dark:hover:bg-ink-night/90"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft transition hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white transition hover:bg-brand-dark"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft dark:border-line-night dark:text-ink-night-soft"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink dark:border-line-night dark:text-ink-night"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="perforation" />

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-b border-line bg-paper px-4 pb-4 md:hidden dark:border-line-night dark:bg-paper-night">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 rounded-md bg-ink px-3 py-2 text-left text-base font-medium text-paper dark:bg-ink-night dark:text-paper-night"
              >
                Log out{user?.name ? ` (${user.name.split(" ")[0]})` : ""}
              </button>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="rounded-md border border-line px-3 py-2 text-center text-base font-medium dark:border-line-night"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-brand px-3 py-2 text-center text-base font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
