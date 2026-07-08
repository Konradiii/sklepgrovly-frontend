import ProductCard from "@/components/ProductCard";
import { Produkt } from "@/types/produkt";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProduktyKategorii({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5219/api/Product/getAllProducts?kategoriaId=${id}`,
    {
      cache: "no-store",
    }
  );

  const produkty: Produkt[] = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Produkty
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produkty.map((p) => (
          <ProductCard key={p.id_Produkt} produkt={p} />
        ))}
      </div>
    </main>
  );
}