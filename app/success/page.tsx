"use client";

import { useState } from "react";

export default function SuccessPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    const res = await fetch("/api/verify-pro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });
    const data = await res.json();

    if (data.pro) {
      setStatus("success");
      // Store email in localStorage for the main app
      localStorage.setItem("planner-pro-email", email.trim().toLowerCase());
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {status === "success" ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">You&apos;re Pro!</h1>
            <p className="mt-2 text-gray-600">
              Your Pro access has been activated. All premium planner types and features are now unlocked.
            </p>
            <a
              href="/"
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Start Creating Planners
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900">Activate Pro Access</h1>
            <p className="mt-2 text-gray-600">
              Enter the email you used during checkout to unlock your Pro features.
            </p>
            <form onSubmit={handleVerify} className="mt-6 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              {status === "error" && (
                <p className="text-sm text-red-600">
                  No active subscription found for this email. Please make sure you used the same email during checkout, or wait a few moments and try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {status === "loading" ? "Verifying..." : "Activate Pro"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
