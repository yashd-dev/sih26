"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const asset = "/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("officer");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await login(email, password);
    setLoading(false);
    if (err) setError(err);
    else router.push("/dashboard");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await register({ name, email, role, department: department || undefined, password });
    setLoading(false);
    if (err) setError(err);
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#fbfbff]">
      <header className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-[80px] max-w-[1200px] items-center px-4">
          <a href="/" className="flex items-center gap-3">
            <img src={`${asset}prism-logo.png`} alt="PRISM" className="h-16 w-auto object-contain" />
          </a>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-bold text-[#171430]">{mode === "login" ? "Sign in to PRISM" : "Create your account"}</h1>
              <p className="mt-1 text-sm text-[#77758d]">{mode === "login" ? "Access the Government Innovation Procurement Platform" : "Join the platform as an officer or innovator"}</p>
            </div>

            <div className="mb-4 flex gap-2 rounded-xl bg-[#f7f8fc] p-1">
              <button onClick={() => { setMode("login"); setError(""); }} className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${mode === "login" ? "bg-white text-[#2f2b69] shadow-sm" : "text-[#77758d]"}`}>Sign In</button>
              <button onClick={() => { setMode("register"); setError(""); }} className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${mode === "register" ? "bg-white text-[#2f2b69] shadow-sm" : "text-[#77758d]"}`}>Register</button>
            </div>

            {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-600">{error}</div>}

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#171430]">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="you@prism.gov" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Password</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="Enter any password" />
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#2f2b69] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#171430]">Full name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="Rajesh Kumar" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="you@prism.gov" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Password</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="Min 6 characters" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">I am a</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]">
                    <option value="officer">Department Officer</option>
                    <option value="startup">Startup / Innovator</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">{role === "officer" ? "Department" : "Organization"}</label>
                  <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder={role === "officer" ? "Municipal Services" : "Your startup name"} />
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#2f2b69] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            )}

            <div className="mt-6 rounded-xl bg-[#f4f2ff] p-4">
              <p className="text-[11px] font-bold text-[#2f2b69]">Demo accounts</p>
              <p className="mt-1 text-[11px] text-[#77758d]">Register with any email, then sign in with the same email and password. Password must be 6+ characters.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
