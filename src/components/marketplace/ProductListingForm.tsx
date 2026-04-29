"use client";

import { useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/Button";
import { ProductType, ProductCategory, DeliveryMethod } from "@/types/marketplace";

interface ProductListingFormProps {
  onSubmit: (data: ProductFormData) => void;
  isSubmitting?: boolean;
  initialData?: Partial<ProductFormData>;
}

export interface ProductFormData {
  name: string;
  description: string;
  longDescription: string;
  price: number;
  inventory: number;
  category: ProductCategory;
  type: ProductType;
  deliveryMethod: DeliveryMethod;
  tags: string[];
  images: string[];
  digitalFileUrl?: string;
  downloadLimit?: number;
}

const CATEGORIES: ProductCategory[] = ["apparel", "posters", "bundles", "accessories", "digital", "courses", "ebooks", "music", "videos", "consulting", "coaching"];
const PRODUCT_TYPES: ProductType[] = ["physical", "digital", "service"];
const DELIVERY_METHODS: DeliveryMethod[] = ["shipping", "digital", "email"];

export function ProductListingForm({ onSubmit, isSubmitting, initialData }: ProductListingFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    longDescription: initialData?.longDescription || "",
    price: initialData?.price || 0,
    inventory: initialData?.inventory || 0,
    category: initialData?.category || "digital",
    type: initialData?.type || "digital",
    deliveryMethod: initialData?.deliveryMethod || "digital",
    tags: initialData?.tags || [],
    images: initialData?.images || [],
    digitalFileUrl: initialData?.digitalFileUrl || "",
    downloadLimit: initialData?.downloadLimit || 3,
  });

  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Basic Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Product Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
            placeholder="e.g., Premium Course Bundle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Short Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
            placeholder="Brief description (shown in listings)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Long Description</label>
          <textarea
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
            placeholder="Detailed description (shown on product page)"
          />
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Pricing & Inventory</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Price (USD) *</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Inventory *</label>
            <input
              type="number"
              required
              min="0"
              value={formData.inventory}
              onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
              placeholder="999 for unlimited"
            />
          </div>
        </div>
      </div>

      {/* Product Type & Category */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Classification</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Product Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ProductType })}
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50 capitalize"
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50 capitalize"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Delivery Method *</label>
            <select
              value={formData.deliveryMethod}
              onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as DeliveryMethod })}
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50 capitalize"
            >
              {DELIVERY_METHODS.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Digital Product Settings */}
      {formData.type === "digital" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ink">Digital Product Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-ink mb-2">File URL</label>
            <input
              type="url"
              value={formData.digitalFileUrl}
              onChange={(e) => setFormData({ ...formData, digitalFileUrl: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Download Limit</label>
            <input
              type="number"
              min="1"
              value={formData.downloadLimit}
              onChange={(e) => setFormData({ ...formData, downloadLimit: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
            />
            <p className="text-xs text-ink/50 mt-1">Maximum number of downloads per purchase</p>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Tags</h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
            placeholder="Add tags..."
          />
          <Button type="button" onClick={addTag} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-wave/10 text-wave text-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-wave/70">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-6 border-t border-ink/10">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? "Saving..." : "Create Listing"}
        </Button>
      </div>
    </form>
  );
}
