"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Upload, AlertCircle } from "lucide-react";

interface VerificationRequestFormProps {
  creatorId: string;
  onSubmit: (data: VerificationFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface VerificationFormData {
  category: string;
  documents: File[];
  description: string;
}

export function VerificationRequestForm({
  creatorId,
  onSubmit,
  isLoading = false,
}: VerificationRequestFormProps) {
  const [formData, setFormData] = useState<VerificationFormData>({
    category: "",
    documents: [],
    description: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.category || formData.documents.length === 0) {
      setError("Please select a category and upload documents");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ category: "", documents: [], description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    setFormData((prev) => ({ ...prev, documents: files }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Verification Category
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Select category...</option>
          <option value="artist">Artist</option>
          <option value="musician">Musician</option>
          <option value="creator">Content Creator</option>
          <option value="organization">Organization</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Supporting Documents
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="doc-upload"
            accept=".pdf,.jpg,.png,.doc,.docx"
          />
          <label htmlFor="doc-upload" className="cursor-pointer">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Click to upload or drag and drop
            </span>
          </label>
          {formData.documents.length > 0 && (
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {formData.documents.length} file(s) selected
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Additional Information
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Tell us about your work..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          rows={4}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Submitting..." : "Submit for Verification"}
      </Button>
    </form>
  );
}
