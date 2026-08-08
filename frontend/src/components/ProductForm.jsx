import { useState } from "react";
import toast from "react-hot-toast";

import { createProduct, updateProduct, generateDescription } from "../api/productApi";
import { Input, Button } from "./ui";

const emptyForm = {
  productName: "",
  ingredients: "",
  weight: "",
  features: "",
  tone: "",
  description: "",
};

const toneOptions = [
  { value: "Premium", hint: "Elevated, confident, indulgent" },
  { value: "Traditional", hint: "Heritage, craftsmanship, homestyle" },
  { value: "Health-focused", hint: "Clean, nutrient-forward, honest" },
  { value: "Playful", hint: "Warm, casual, a little fun" },
  { value: "Minimal", hint: "Plain-spoken, no fluff" },
  { value: "custom", hint: "Write your own" },
];

function initialFormFrom(editingProduct) {
  if (!editingProduct) return emptyForm;

  return {
    productName: editingProduct.productName || "",
    ingredients: editingProduct.ingredients || "",
    weight: editingProduct.weight || "",
    features: editingProduct.features || "",
    tone: editingProduct.tone || "",
    description: editingProduct.description || "",
  };
}

function initialToneMode(editingProduct) {
  const presetValues = toneOptions
    .filter((option) => option.value !== "custom")
    .map((option) => option.value);
  const tone = editingProduct?.tone || "";
  if (tone && !presetValues.includes(tone)) return "custom";
  return tone || "";
}

// NOTE: parents should render this with a `key` tied to the product being
// edited (e.g. key={editingProduct?._id || "new"}) so the form re-mounts
// with fresh state instead of syncing state from props in an effect.
function ProductForm({ onProductCreated, editingProduct, onProductUpdated, onCancel }) {
  const [form, setForm] = useState(() => initialFormFrom(editingProduct));
  const [toneMode, setToneMode] = useState(() => initialToneMode(editingProduct));
  const [errors, setErrors] = useState({});
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.productName.trim()) {
      nextErrors.productName = "Product name is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!form.productName.trim()) {
      setErrors((prev) => ({
        ...prev,
        productName: "Add a product name before generating a description.",
      }));
      return;
    }

    try {
      setGenerating(true);
      const data = await generateDescription(form);
      setForm((prev) => ({ ...prev, description: data.description }));
      toast.success("AI description generated!");
    } catch {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);

      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, form);
        onProductUpdated(updated);
        toast.success("Product updated!");
      } else {
        const created = await createProduct(form);
        onProductCreated(created);
        toast.success("Product created!");
      }

      setForm(emptyForm);
      setToneMode("");
    } catch {
      toast.error("Operation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!form.description) return;

    try {
      await navigator.clipboard.writeText(form.description);
      setCopied(true);
      toast.success("Description copied to clipboard.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Please select and copy manually.");
    }
  };

  const busy = generating || submitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Product name"
        required
        placeholder="e.g. Alpine Trail Backpack"
        value={form.productName}
        onChange={updateField("productName")}
        error={errors.productName}
        disabled={busy}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Ingredients / materials"
          placeholder="e.g. Ripstop nylon, aluminum frame"
          value={form.ingredients}
          onChange={updateField("ingredients")}
          disabled={busy}
        />
        <Input
          label="Weight"
          placeholder="e.g. 1.2 kg"
          value={form.weight}
          onChange={updateField("weight")}
          disabled={busy}
        />
      </div>

      <Input
        label="Key features"
        placeholder="e.g. Waterproof, laptop sleeve, ergonomic straps"
        value={form.features}
        onChange={updateField("features")}
        disabled={busy}
      />

      <div>
        <label
          htmlFor="tone-select"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ink-night"
        >
          Tone of voice
        </label>
        <select
          id="tone-select"
          value={toneMode}
          disabled={busy}
          onChange={(e) => {
            const next = e.target.value;
            setToneMode(next);
            if (next === "custom") {
              setForm((prev) => ({ ...prev, tone: "" }));
            } else {
              setForm((prev) => ({ ...prev, tone: next }));
            }
          }}
          className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60 dark:border-line-night dark:bg-paper-night dark:text-ink-night"
        >
          <option value="" disabled>
            Choose a tone…
          </option>
          {toneOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value === "custom" ? "Custom…" : option.value}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-sm text-ink-soft dark:text-ink-night-soft">
          {toneOptions.find((o) => o.value === toneMode)?.hint ||
            "Sets the voice the AI writes in."}
        </p>

        {toneMode === "custom" && (
          <div className="mt-3">
            <Input
              placeholder="e.g. Rustic, family-owned, no-nonsense"
              value={form.tone}
              onChange={updateField("tone")}
              disabled={busy}
            />
          </div>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <label
            htmlFor="ai-description"
            className="text-sm font-medium text-ink dark:text-ink-night"
          >
            Description
          </label>
          <div className="flex items-center gap-2">
            {form.description && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={busy}
              >
                {copied ? "Copied ✓" : "Copy"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              loading={generating}
              disabled={submitting}
            >
              {generating ? "Generating…" : "Generate with AI"}
            </Button>
          </div>
        </div>
        <Input
          as="textarea"
          id="ai-description"
          rows={6}
          placeholder="Your AI-generated description will appear here, or write your own."
          value={form.description}
          onChange={updateField("description")}
          hint="Long descriptions wrap automatically and stay easy to read."
          disabled={busy}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={submitting} disabled={generating}>
          {editingProduct ? "Update product" : "Create product"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
