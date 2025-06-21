"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user_id", username);
    router.push("/posts");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#243831]">
      <div className="w-full md:w-1/2 flex flex-col min-h-screen md:min-h-0">
        <div className="pt-5 bg-[#2B5F44] rounded-bl-3xl rounded-br-3xl md:hidden">
          <div className="flex flex-col items-center mb-8">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />
            <p className="text-white italic mt-2 text-lg">a Board</p>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center p-5">
          <form onSubmit={handleLogin} className="w-full max-w-sm text-white">
            <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 text-black bg-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-[#2B5F44]">
        <Image src="/logo.svg" alt="Logo" width={160} height={160} />
        <p className="text-white italic mt-4 text-xl">a Board</p>
      </div>
    </div>
  );
}
