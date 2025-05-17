import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-400 text-white p-4 shadow flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">FEMSA Dashboard</h1>
      <nav>
        <Link
          href="/dashboard"
          className="bg-[#e60026] text-white px-4 py-2 rounded shadow border-2 border-[#e60026] hover:bg-white hover:text-[#e60026] hover:border-[#e60026] transition font-semibold"
        >
          Crear
        </Link>
      </nav>
    </header>
  );
}