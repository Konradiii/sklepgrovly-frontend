import { Produkt } from "@/types/produkt";
import ProductCard from "@/components/ProductsCard";

export default async function ProduktyPage() {
    const res = await fetch("http://localhost:5219/api/Product/getAllProducts", {
        cache: "no-store",
    });
    const produkty: Produkt[] = await res.json();

    return (
        <main className="py-16 px-8 bg-white">
            {/* Nagłówek sekcji — w stylu strony głównej */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900">
                    Nasze produkty
                </h1>
                <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                    Starannie dobrane zabawki edukacyjne, które wspierają rozwój Twojego dziecka.
                </p>
            </div>

            {/* Siatka produktów */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {produkty.map((p) => (
                    <ProductCard key={p.id_Produkt} produkt={p} />
                ))}
            </div>
        </main>
    );
}