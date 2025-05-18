"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías validar usuario/contraseña
    router.push("/homemain");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#de3d3d]">
      
      <form
        onSubmit={handleLogin}
        className="bg-[#ffffff] rounded-xl shadow-lg p-12 flex flex-col items-center w-full max-w-md border border-blue-200"
      >
        <Image
          src="/images/oxxoimage.png"
          alt="Image OXXO"
          className="max-h-64 rounded pb-5"
          width={256}
          height={256}
        />
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-4 w-full px-4 py-2 rounded border border-blue-300 focus:outline-none"
        />
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-6 w-full px-4 py-2 rounded border border-blue-300 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-[#e60026] text-[#ffffff] font-bold py-2 rounded hover:bg-blue-100 transition"
        >
          LOGIN
        </button>
        <a href="#" className="mt-4 text-white text-sm hover:underline">Forgot password?</a>
      </form>
    </div>
  );
}