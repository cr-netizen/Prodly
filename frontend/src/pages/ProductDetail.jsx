import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProduct, deleteProduct } from "../api/productApi";
import { Button, Modal } from "../components/ui";
import Loader from "../components/ui/Loader";
import ProductForm from "../components/ProductForm";

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M15 8.5V6.5A2 2 0 0 0 13 4.5H6.5a2 2 0 0 0-2 2V13a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const fields = [
  { key: "ingredients", label: "Ingredients / materials" },
  { key: "weight", label: "Weight" },
  { key: "features", label: "Key features" },
  { key: "tone", label: "Tone of voice" },
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);
      setError("");
      const data = await getProduct(id);
      setProduct(data);
    } catch {
      setError("We couldn't load this product. It may have been removed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdated = (updated) => {
    setProduct(updated);
    setEditOpen(false);
    toast.success("Product updated!");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this product? This can't be undone."
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await deleteProduct(id);
      toast.success("Product deleted.");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Failed to delete product. Please try again.");
      setDeleting(false);
    }
  };

  const handleCopy = async () => {
    if (!product?.description) return;

    try {
      await navigator.clipboard.writeText(product.description);
      setCopied(true);
      toast.success("Description copied to clipboard.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Please select and copy manually.");
    }
  };

  if (loading) return <Loader fullScreen label="Loading product…" />;

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold">{error}</h1>
        <Link
          to="/dashboard"
          className="mt-6 inline-block text-sm font-medium text-brand hover:underline"
        >
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        to="/dashboard"
        className="text-sm font-medium text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
      >
        ← Back to products
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-eyebrow text-xs text-brand">Product</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">
            {product.productName}
          </h1>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting}>
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label }) =>
          product[key] ? (
            <div
              key={key}
              className="rounded-xl border border-line bg-paper-soft p-4 dark:border-line-night dark:bg-paper-night-soft"
            >
              <p className="font-eyebrow text-[11px] text-ink-soft dark:text-ink-night-soft">
                {label}
              </p>
              <p className="mt-1 text-sm">{product[key]}</p>
            </div>
          ) : null
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="font-eyebrow text-[11px] text-ink-soft dark:text-ink-night-soft">
            Description
          </p>
          {product.description && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition hover:text-brand-dark"
            >
              {copied ? (
                <>
                  <CheckIcon /> Copied
                </>
              ) : (
                <>
                  <CopyIcon /> Copy description
                </>
              )}
            </button>
          )}
        </div>
        <div className="mt-2 rounded-2xl border border-line bg-paper p-6 dark:border-line-night dark:bg-paper-night">
          {product.description ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-ink-night">
              {product.description}
            </p>
          ) : (
            <p className="text-sm text-ink-soft dark:text-ink-night-soft">
              No description yet — edit this product to generate one with AI.
            </p>
          )}
        </div>
      </div>

      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit product"
      >
        <ProductForm
          key={product._id}
          editingProduct={product}
          onProductUpdated={handleUpdated}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default ProductDetail;
