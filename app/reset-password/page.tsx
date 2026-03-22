"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Supabase sends recovery token in the URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (hashParams.get("type") !== "recovery") {
      // Still set up the listener for the auth event
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "PASSWORD_RECOVERY") {
          // User is now in recovery mode, show the form
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-green-700">Password updated!</h1>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">Set New Password</h1>
        {error && <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleReset} className="space-y-4">
          <input type="password" placeholder="New password (min 6 characters)" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" required minLength={6} />
          <button type="submit" className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700">
            Update Password
          </button>
        </form>
      </div>
    </main>
  );
}
