"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { ShippingAddress } from "@/types/marketplace";

interface ShippingAddressFormProps {
  onSubmit: (address: ShippingAddress) => void;
  onBack: () => void;
  initialData?: ShippingAddress;
}

export function ShippingAddressForm({ onSubmit, onBack, initialData }: ShippingAddressFormProps) {
  const [formData, setFormData] = useState<ShippingAddress>(
    initialData || {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phone: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Full Name *</label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Address Line 1 *</label>
        <input
          type="text"
          required
          value={formData.addressLine1}
          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Address Line 2</label>
        <input
          type="text"
          value={formData.addressLine2}
          onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">City *</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">State *</label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Postal Code *</label>
          <input
            type="text"
            required
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Country *</label>
          <select
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
        <Button type="submit" className="flex-1">Continue to Payment</Button>
      </div>
    </form>
  );
}
