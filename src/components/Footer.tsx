import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo + hasło */}
                <div>
                    <Image
                        src="/logo-green.png"
                        alt="Grovly"
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain"
                    />
                    <p className="mt-4 text-sm text-gray-400">
                        Zabawa, która rozwija. Starannie dobrane zabawki edukacyjne dla dzieci.
                    </p>
                </div>

                {/* Nawigacja */}
                <div>
                    <h3 className="font-semibold text-white mb-3">Sklep</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/produkty" className="hover:text-[#B4D88C] transition">Produkty</Link></li>
                        <li><Link href="/kategorie" className="hover:text-[#B4D88C] transition">Kategorie</Link></li>
                        <li><Link href="/koszyk" className="hover:text-[#B4D88C] transition">Koszyk</Link></li>
                    </ul>
                </div>

                {/* Info */}
                <div>
                    <h3 className="font-semibold text-white mb-3">Informacje</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-[#B4D88C] transition">O nas</Link></li>
                        <li><Link href="#" className="hover:text-[#B4D88C] transition">Kontakt</Link></li>
                        <li><Link href="#" className="hover:text-[#B4D88C] transition">Regulamin</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
                © 2026 Grovly. Wszelkie prawa zastrzeżone.
            </div>
        </footer>
    );
}