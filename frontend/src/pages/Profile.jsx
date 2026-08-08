import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getProfile, deleteAccount } from "../api/authApi";
import { Button, Input, Modal } from "../components/ui";
import Loader from "../components/ui/Loader";
import { useAuth } from "../context/useAuth";

function formatMemberSince(dateString) {
  if (!dateString) return null;
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

function Profile() {
  const { user: sessionUser, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");
        const data = await getProfile();
        if (active) setProfile(data.user);
      } catch {
        if (active) setError("We couldn't load your profile. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const handleDeleteAccount = async () => {
    if (confirmText.trim().toUpperCase() !== "DELETE") return;

    try {
      setDeleting(true);
      await deleteAccount();
      toast.success("Your account has been deleted.");
      logout();
      navigate("/", { replace: true });
    } catch {
      toast.error("Couldn't delete your account. Please try again.");
      setDeleting(false);
    }
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmText("");
  };

  if (loading) return <Loader fullScreen label="Loading your profile…" />;

  const displayName = profile?.name || sessionUser?.name || "Your account";
  const displayEmail = profile?.email || sessionUser?.email;
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const memberSince = formatMemberSince(profile?.createdAt);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="font-eyebrow text-xs text-brand">Account</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Profile</h1>
      <p className="mt-2 text-sm text-ink-soft dark:text-ink-night-soft">
        Manage your Prodly account.
      </p>

      {error ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <>
          <section className="mt-8 rounded-2xl border border-line bg-paper-soft p-6 dark:border-line-night dark:bg-paper-night-soft">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand font-display text-xl text-white"
              >
                {initials || "?"}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {displayName}
                </h2>
                <p className="text-sm text-ink-soft dark:text-ink-night-soft">
                  {displayEmail}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 border-t border-dashed border-line pt-6 dark:border-line-night sm:grid-cols-2">
              <div>
                <dt className="font-eyebrow text-[11px] text-ink-soft dark:text-ink-night-soft">
                  Sign-in method
                </dt>
                <dd className="mt-1 text-sm capitalize">
                  {profile?.provider === "google" ? "Google" : "Email & password"}
                </dd>
              </div>
              {memberSince && (
                <div>
                  <dt className="font-eyebrow text-[11px] text-ink-soft dark:text-ink-night-soft">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm">{memberSince}</dd>
                </div>
              )}
            </dl>
          </section>

          <section className="mt-6 rounded-2xl border border-red-200 bg-red-50/60 p-6 dark:border-red-900/40 dark:bg-red-950/10">
            <h2 className="font-display text-lg font-semibold text-red-700 dark:text-red-400">
              Account deletion
            </h2>
            <p className="mt-2 text-sm text-ink-soft dark:text-ink-night-soft">
              Deleting your account permanently removes your profile and every
              product you've created. This can't be undone.
            </p>
            <Button
              variant="danger"
              className="mt-4"
              onClick={() => setConfirmOpen(true)}
            >
              Delete account
            </Button>
          </section>
        </>
      )}

      <Modal
        isOpen={confirmOpen}
        onClose={closeConfirm}
        title="Delete your account?"
      >
        <p className="text-sm text-ink-soft dark:text-ink-night-soft">
          This will permanently delete your account and all of your saved
          products. Type <span className="font-semibold text-ink dark:text-ink-night">DELETE</span> to
          confirm.
        </p>

        <div className="mt-4">
          <Input
            label="Confirmation"
            placeholder="Type DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            disabled={deleting}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={closeConfirm} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            loading={deleting}
            disabled={confirmText.trim().toUpperCase() !== "DELETE"}
          >
            Delete my account
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
