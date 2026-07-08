import ProductCard from "@/components/ProductsCard";
import { Produkt } from "@/types/produkt";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProduktyKategorii({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5219/api/Product/getAllProducts?kategoriaId=${id}`,
    { cache: "no-store" }
  );
  const produkty: Produkt[] = await res.json();

  return (
    <main className="py-16 px-8 bg-white">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900">Produkty</h1>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Zabawki z wybranej kategorii.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {produkty.map((p) => (
          <ProductCard key={p.id_Produkt} produkt={p} />
        ))}
      </div>
    </main>
  );
}