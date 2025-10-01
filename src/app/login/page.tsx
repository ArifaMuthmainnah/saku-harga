"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      router.push("/admin");
    } else if (username === "user" && password === "user123") {
      localStorage.setItem("role", "user");
      router.push("/user");
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}
