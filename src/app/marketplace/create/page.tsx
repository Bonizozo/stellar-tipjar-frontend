"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ProductListingForm } from "@/components/marketplace/ProductListingForm";
import { useWalletContext } from "@/contexts/WalletContext";
import { WalletConnector } from "@/components/WalletConnector";

export default function CreateStorePage() {
  const router = useRouter();
  const { isConnected } = useWalletContext();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: any) => {
    setIsSaving(true);
    try {
      // Replace with: await fetch("/api/marketplace/products", { method: "POST", body: JSON.stringify(data) })
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/marketplace");
    } catch (error) {
      console.error("Failed to create product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/marketplace">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-wave" />
              <h1 className="text-3xl font-bold text-ink">Create Product Listing</h1>
            </div>
            <p className="text-ink/60 mt-1">Add a new product to your marketplace store</p>
          </div>
        </div>
        {!isConnected && <WalletConnector />}
      </div>

      {/* Wallet warning */}
      {!isConnected && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 p-4 text-yellow-800 dark:text-yellow-300">
          <p className="font-medium">Connect your wallet to create listings</p>
          <p className="text-sm mt-1">You need a connected Stellar wallet to receive payments.</p>
        </div>
      )}

      {/* Form */}
      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <ProductListingForm onSubmit={handleSave} isSubmitting={isSaving} />
      </div>
    </div>
  );
}
