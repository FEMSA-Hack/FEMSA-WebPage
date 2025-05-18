import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-400 text-white p-4 shadow flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/images/FEMSA_Logo.png"
          alt="Logo FEMSA"
          width={150}
          height={100}
          className="mr-2"
        />
      </div>
      <nav>
        <Link
          href="/homemain"
          className="bg-[#e60026] text-white px-4 py-2 rounded shadow border-2 border-[#e60026] hover:bg-white hover:text-[#e60026] hover:border-[#e60026] transition font-semibold"
        >
          Crear
        </Link>
      </nav>
    </header>
  );
}