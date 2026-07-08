import Link from "next/link"

export default function Navbar(){
    return(
        <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">SklepGrovly</Link>
            <div className="flex gap-6">
                <Link href="/produkty" className="hover:underline">Produkty</Link>
                <Link href="/kategorie" className="hover:underline">Kategorie</Link>
                <Link href="/koszyk" className="hover:underline">Koszyk</Link>
                <Link href="/logowanie" className="hover:underline">Zaloguj</Link>
            </div>
        </nav>
    );

}