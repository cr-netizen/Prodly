import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Card from "../components/Card";
import ProductForm from "../components/ProductForm";
import { Button, Input, Modal } from "../components/ui";
import { CardSkeletonGrid } from "../components/ui/Loader";
import { useAuth } from "../context/useAuth";
import { getProducts, deleteProduct } from "../api/productApi";

function Dashboard() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      setLoadError("");
      const data = await getProducts();
      setProducts(data);
    } catch {
      setLoadError("We couldn't load your products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.productName?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [products, search]);

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEditForm = (id) => {
    const product = products.find((p) => p._id === id);
    setEditingProduct(product || null);
    setFormOpen(true);
  };

  const handleProductCreated = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setFormOpen(false);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    setEditingProduct(null);
    setFormOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product? This can't be undone."
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const firstName = user?.name ? user.name.split(" ")[0] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-eyebrow text-xs text-brand">Dashboard</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">
            {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
          </h1>
          {user?.email && (
            <p className="mt-1 text-sm text-ink-soft dark:text-ink-night-soft">
              {user.email}
            </p>
          )}
        </div>

        <Button onClick={openCreateForm}>+ New product</Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-paper-soft p-5 dark:border-line-night dark:bg-paper-night-soft">
          <p className="font-eyebrow text-xs text-ink-soft dark:text-ink-night-soft">
            Total products
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-brand">
            {loading ? "—" : products.length}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-paper-soft p-5 dark:border-line-night dark:bg-paper-night-soft">
          <p className="font-eyebrow text-xs text-ink-soft dark:text-ink-night-soft">
            With AI descriptions
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-accent">
            {loading ? "—" : products.filter((p) => p.description).length}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-paper-soft p-5 dark:border-line-night dark:bg-paper-night-soft">
          <p className="font-eyebrow text-xs text-ink-soft dark:text-ink-night-soft">
            Drafts without copy
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-lilac">
            {loading ? "—" : products.filter((p) => !p.description).length}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-semibold">My products</h2>
        {products.length > 0 && (
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>
        )}
      </div>

      <div className="mt-5">
        {loading ? (
          <CardSkeletonGrid count={4} />
        ) : loadError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
            <p className="text-red-600 dark:text-red-400">{loadError}</p>
            <Button variant="outline" className="mt-4" onClick={fetchProducts}>
              Try again
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-paper-soft p-10 text-center dark:border-line-night dark:bg-paper-night-soft">
            <h3 className="font-display text-lg font-semibold">
              No products yet
            </h3>
            <p className="mt-2 text-sm text-ink-soft dark:text-ink-night-soft">
              Create your first product and let AI draft the description.
            </p>
            <Button className="mt-5" onClick={openCreateForm}>
              Create your first product
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-paper-soft p-10 text-center dark:border-line-night dark:bg-paper-night-soft">
            <h3 className="font-display text-lg font-semibold">
              No results for "{search}"
            </h3>
            <p className="mt-2 text-sm text-ink-soft dark:text-ink-night-soft">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                id={product._id}
                title={product.productName}
                description={product.description}
                onDelete={handleDelete}
                onEdit={openEditForm}
                deleting={deletingId === product._id}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingProduct ? "Edit product" : "New product"}
      >
        <ProductForm
          key={editingProduct?._id || "new"}
          editingProduct={editingProduct}
          onProductCreated={handleProductCreated}
          onProductUpdated={handleProductUpdated}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
