
import { Produkt } from "@/types/produkt";
import ProductCard from "@/components/ProductCard";

export default async function ProduktyPage() {


    const res = await fetch("http://localhost:5219/api/Product/getAllProducts", {cache: "no-store"});
    const produkty: Produkt[] = await res.json();

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold text-center p-5 mb-8">Wszystkie produkty</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {produkty.map((p)=> (
                    <ProductCard key={p.id_Produkt} produkt={p} />
                ))}
            </div>
        </main>
    );
}