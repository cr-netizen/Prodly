import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="border-t border-line bg-paper-soft dark:border-line-night dark:bg-paper-night-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white font-display text-sm">
              P
            </span>
            <span className="font-display text-lg">Prodly</span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-ink-soft dark:text-ink-night-soft">
            Write clear, on-brand product descriptions in seconds, powered by
            AI.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="font-eyebrow text-xs text-ink-soft dark:text-ink-night-soft">
              Navigate
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-eyebrow text-xs text-ink-soft dark:text-ink-night-soft">
              Account
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="perforation" />

      <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-ink-soft sm:px-6 dark:text-ink-night-soft">
        © {new Date().getFullYear()} Prodly. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
