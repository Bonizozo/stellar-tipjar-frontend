"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setError("");
    setStatus("success");
    setEmail("");
  }

  return (
    <div>
      <p className="text-sm text-gray-300 dark:text-gray-400 mb-3">
        Join our newsletter for creator tips and Stellar updates.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          Subscribe
        </button>
        {status === "success" && (
          <p className="text-sm text-green-400">Thanks for subscribing!</p>
        )}
        {status === "error" && error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </form>
    </div>
  );
}
