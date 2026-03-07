"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Log In</h1>

        {error && <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <hr className="flex-1" /><span className="text-sm text-gray-400">or</span><hr className="flex-1" />
        </div>

        <button onClick={handleGoogleLogin}
          className="w-full rounded-lg border py-3 font-medium text-gray-700 hover:bg-gray-50">
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          <Link href="/forgot-password" className="text-orange-600 hover:underline">Forgot password?</Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          Don&apos;t have an account? <Link href="/register" className="text-orange-600 hover:underline">Register</Link>
        </p>
      </div>
    </main>
  );
}
