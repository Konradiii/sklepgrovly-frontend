
type Produkt = {
    id_Produkt: number;
    nazwa: string;
    cena: number;
    znizka: number;
};


export default async function ProduktyPage() {


    const res = await fetch("http://localhost:5219/api/Product/getAllProducts", {cache: "no-store"});
    const produkty: Produkt[] = await res.json();

    return (
        <main className="p-8">
        <h1 className="text-3xl font-bold">Wszystkie produkty</h1>
        <ul className="space-y-2">
            {produkty.map((p)=>(
                <li key={p.id_Produkt} className="border p-4 rounded">
                    <span className="font-semibold">{p.nazwa}</span> - {p.cena} zł
                    {p.znizka > 0 && (<span className="text-red-600">  -{p.znizka}%</span>)}
                </li>
            ))}
        </ul>
        </main>
    );

}