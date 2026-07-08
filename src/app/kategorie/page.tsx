import { Kategoria } from "@/types/kategoria";
import KategoriaCard from "@/components/KategoryCard";

export default async function KategoriePage() {
    const res = await fetch("http://localhost:5219/api/Category", {
        cache: "no-store",
    });
    const kategorie: Kategoria[] = await res.json();

    return (
        <main className="py-16 px-8 bg-white">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900">Kategorie</h1>
                <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                    Przeglądaj zabawki według kategorii i znajdź to, czego szukasz.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {kategorie.map((k) => (
                    <KategoriaCard key={k.id_Kategoria} kategoria={k} />
                ))}
            </div>
        </main>
    );
}