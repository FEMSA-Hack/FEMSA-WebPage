"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Por favor ingresa tu usuario.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setError("");
    router.push("/homemain");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/BackFEMSA.jpg')] bg-cover bg-center">
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
        <h2 className="text-2xl font-bold text-[#e60026] mb-6 tracking-wide drop-shadow">Iniciar sesión</h2>
        {error && (
          <div className="mb-4 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center font-semibold">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-4 w-full px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-[#e60026] transition"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-6 w-full px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-[#e60026] transition"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#e60026] to-[#ff5a36] text-white font-bold py-2 rounded shadow-lg hover:from-[#b8001b] hover:to-[#e60026] transition text-lg tracking-wide"
        >
          Ingresar
        </button>
        <a href="#" className="mt-4 text-[#e60026] text-sm hover:underline">¿Olvidaste tu contraseña?</a>
      </form>
    </div>
  );
}