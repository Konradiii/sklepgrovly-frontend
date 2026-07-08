import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Grovly"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                />
            </Link>

            <div className="flex gap-8 items-center">
                <Link href="/produkty" className="text-gray-700 hover:text-[#8FB859] transition font-medium">
                    Produkty
                </Link>
                <Link href="/kategorie" className="text-gray-700 hover:text-[#8FB859] transition font-medium">
                    Kategorie
                </Link>
                <Link href="/koszyk" className="text-gray-700 hover:text-[#8FB859] transition font-medium">
                    Koszyk
                </Link>
                <Link
                    href="/logowanie"
                    className="bg-[#8FB859] text-white px-5 py-2 rounded-full font-medium hover:bg-[#7da54c] transition"
                >
                    Zaloguj
                </Link>
            </div>
        </nav>
    );
}