"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSent(true);
  };

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">Check your email</h1>
          <p className="text-gray-600">Password reset link sent to <strong>{email}</strong>.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          <button type="submit" className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700">
            Send Reset Link
          </button>
        </form>
        <p className="mt-4 text-center text-sm"><Link href="/login" className="text-orange-600 hover:underline">Back to login</Link></p>
      </div>
    </main>
  );
}
